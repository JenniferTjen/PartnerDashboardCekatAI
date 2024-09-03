import {supabase} from'@/utils/supabaseClient'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, agentName, password, role } = req.body;
        try {
            // Step 1: Sign up the user
            const signUpResponse = await supabase.auth.signUp({
                email,
                password,
                options: {
                    agentName,
                    role,
                },
            });

            if (signUpResponse.error) {
                throw signUpResponse.error;
            }

            // Step 2: If sign-up is successful, insert user data into 'users' table
            const { data, error } = await supabase.from('agents').insert({
                email,
                agentName,
                password,
                role,
            });

            if (error) {
                throw error;
            }

            res.status(200).json({ message: 'Agent added successfully' });
        } catch (error) {
            console.error('Error adding agent:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
