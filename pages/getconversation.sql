CREATE OR REPLACE FUNCTION get_conversations_page9(
    business_id_param uuid,
    search_term_param text,
    label_param text,
    handled_by_param uuid,
    stage_status_param conv_stage_status,
    inbox_id_param uuid,
    agent_id_param uuid,
    ai_agent_id_param uuid,
    profile_role text,
    profile_id uuid,
    conversation_id_param uuid,
    page_param integer DEFAULT 1,
    pagesize_param integer DEFAULT 100000
)
RETURNS TABLE(
    total_count bigint,
    total_unassigned bigint,
    total_assigned bigint,
    data_pagination jsonb
) AS $$

DECLARE
   total_count bigint;
   total_unassigned bigint;
   total_assigned bigint;
BEGIN
    RETURN QUERY WITH filtered_data AS (
       SELECT
           c.id,
           c.contact_id,
           c.inbox_id,
           c.assigned_by,
           c.handled_by,
           a_h.name AS handled_by_name,
           a_a.name AS assigned_by_name,
           c.stage_status,
           co.display_name,
           co.phone_number,
           co.platform_id,
           i.name AS inbox_name,
           i.type AS inbox_type,
           i.business_id,
           i.ai_agent_id,
           m_last.id AS message_id,
           m_last.message AS message_last_content,
           m_last.sent_by::TEXT AS message_last_sent_by,
           m_last.last AS message_last_created_at,
           (
               SELECT jsonb_agg(
                   jsonb_build_object(
                       'id', msg.id,
                       'created_at', msg.created_at,
                       'message', msg.message,
                       'sent_by', msg.sent_by,
                       'status', msg.status,
                       'conversation_id', msg.conversation_id,
                       'media_url', msg.media_url,
                       'media_type', msg.media_type
                   )
               )
               FROM (
                   SELECT
                       m1.id,
                       m1.created_at,
                       m1.message,
                       m1.sent_by,
                       m1.status,
                       m1.conversation_id,
                       m1.media_url,
                       m1.media_type
                   FROM messages m1
                   WHERE m1.conversation_id = c.id
                   AND (search_term_param IS NULL OR m1.message ILIKE '%' || search_term_param || '%')
                   ORDER BY m1.created_at ASC
               ) msg
           ) AS messages,
           (
               SELECT jsonb_agg(
                   jsonb_build_object(
                       'id', l.id,
                       'label_name', l.name
                   )
               )
               FROM conversations_labels cl
               LEFT JOIN labels l ON cl.label_id = l.id
               WHERE cl.conversation_id = c.id
           ) AS labels,
           (
               SELECT COUNT(*)
               FROM (
                   SELECT m1.*
                   FROM messages m1
                   WHERE m1.conversation_id = c.id
                   AND m1.sent_by = c.contact_id::text
                   AND NOT EXISTS (
                       SELECT 1
                       FROM messages m2
                       WHERE m2.conversation_id = c.id
                       AND m2.created_at > m1.created_at
                       AND m2.sent_by != c.contact_id::text
                       AND m2.sent_by != 'system'
                   )
                   ORDER BY m1.created_at DESC
               ) AS unreplied
           ) AS unreplied_msg_count
       FROM conversations c
           JOIN contacts co ON c.contact_id = co.id
           JOIN inboxes i ON c.inbox_id = i.id
           LEFT JOIN agents a_h ON c.handled_by = a_h.id
           LEFT JOIN agents a_a ON c.assigned_by = a_a.id
           LEFT JOIN (
               SELECT
                   m1.id,
                   m1.conversation_id,
                   m1.created_at AS last,
                   m1.message,
                   m1.sent_by
               FROM messages m1
               WHERE m1.created_at = (
                       SELECT MAX(m2.created_at)
                       FROM messages m2
                       WHERE m2.conversation_id = m1.conversation_id
                   )
           ) m_last ON c.id = m_last.conversation_id
       WHERE
           -- Your existing conditions here
           ((business_id_param IS NULL OR i.business_id = business_id_param)
       AND (search_term_param IS NULL OR EXISTS (SELECT 1 FROM messages m2 WHERE m2.conversation_id = c.id AND m2.message ILIKE '%' || search_term_param || '%'))
       AND (label_param IS NULL OR EXISTS (SELECT 1 FROM conversations_labels cl2 JOIN labels l2 ON cl2.label_id = l2.id WHERE cl2.conversation_id = c.id AND l2.name = label_param))
       AND (
           handled_by_param IS NULL
           OR (
               c.handled_by = handled_by_param
               OR (
                   EXISTS (
                   SELECT 1
                   FROM agents_inboxes
                   WHERE agents_inboxes.agent_id = handled_by_param AND agents_inboxes.inbox_id = c.inbox_id
               ) AND (c.stage_status = 'pending')
               )
           )
       )
       AND (stage_status_param IS NULL OR c.stage_status = stage_status_param)
       AND (inbox_id_param IS NULL OR c.inbox_id = inbox_id_param)
       AND (
           EXISTS (
               SELECT 1
               FROM agents_inboxes
               WHERE agents_inboxes.agent_id = agent_id_param AND agents_inboxes.inbox_id = c.inbox_id
           )
           OR EXISTS (
               SELECT 1
               FROM agents_divisions
               JOIN inboxes_divisions ON agents_divisions.division_id = inboxes_divisions.division_id
               WHERE agents_divisions.agent_id = agent_id_param AND inboxes_divisions.inbox_id = c.inbox_id
           )
           OR (
               SELECT agents.role
               FROM agents
               WHERE agents.id = agent_id_param
           ) = 'super-agent'::agent_role
           OR c.handled_by = agent_id_param
       )
       AND (ai_agent_id_param IS NULL OR i.ai_agent_id = ai_agent_id_param)
       AND (
           SELECT count(*)
           FROM messages
           WHERE conversation_id = c.id
       ) > 0)
       AND (conversation_id_param IS NULL OR c.id = conversation_id_param) -- Added condition
       OR
       (
           -- Check if all parameters are NULL to fetch all conversations
           business_id_param IS NULL
           AND search_term_param IS NULL
           AND label_param IS NULL
           AND handled_by_param IS NULL
           AND stage_status_param IS NULL
           AND inbox_id_param IS NULL
           AND agent_id_param IS NULL
           AND ai_agent_id_param IS NULL
       )
       ORDER BY
           m_last.last DESC
    ),
    counts AS (
       SELECT
           COUNT(*) AS total_count,
           COUNT(*) FILTER (WHERE handled_by IS NULL) AS total_unassigned,
           COUNT(*) FILTER (WHERE handled_by IS NOT NULL) AS total_assigned
       FROM filtered_data
    ),
    paginated_data AS (
        SELECT *
        FROM filtered_data
        ORDER BY message_last_created_at DESC -- Order by the last message timestamp
        LIMIT pagesize_param
        OFFSET (page_param - 1) * pagesize_param
    )
   SELECT
       counts.total_count,
       counts.total_unassigned,
       counts.total_assigned,
       (
           SELECT jsonb_agg(row_to_json(paginated_data.*))
           FROM paginated_data
       ) AS data_pagination
   FROM counts;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM get_conversations_page9(
    '0eb00dec-432c-42cf-ac47-04fb54f4a332', -- business_id_param
    NULL, -- search_term_param
    NULL, -- label_param
    NULL, -- handled_by_param
    NULL, -- stage_status_param
    NULL, -- inbox_id_param
    NULL, -- agent_id_param
    NULL, -- ai_agent_id_param
    NULL, -- profile_role
    NULL, -- profile_id
    NULL, -- conversation_id_param
    1, -- page_param (default value)
    50 -- pagesize_param (default value)
);
