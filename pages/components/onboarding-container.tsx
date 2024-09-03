import React, { useState, useRef, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { timeFormatter } from '@/utils/helpers';
import IconMoodSmile from '@/components/Icon/IconMoodSmile';
import IconMenu from '@/components/Icon/IconMenu';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { set } from 'lodash';
import { Virtuoso } from 'react-virtuoso';
import IconMessage from '@/components/Icon/IconMessage';
import Link from 'next/link';

interface IOnboardingContainer {
    // data: any;
    // selectedUser: any;
    // profileData?: any;
    // handleResolveConversation: any;
    // toggleChatMenu: any;
    // isLoading: boolean;
    inboxCheck: boolean;
    chatbotCheck: boolean;
    agentCheck: boolean;
    agentsInboxCheck:boolean;
    toggleChatMenu: any;
}

const OnboardingContainer = (props: IOnboardingContainer) => {
    const isDark = false;

    const LinkComponent = ({title, description, link, img, isDone = false}) => (
        <div className={`flex max-h-[100px] bg-white border border-gray-200 rounded-lg shadow ${isDone ? 'hover:bg-gray-200' : 'hover:bg-gray-100'} dark:border-gray-700 dark:bg-gray-800 ${isDone ? 'dark:hover:bg-gray-600' : 'dark:hover:bg-gray-700'}`} style={{ maxWidth: '350px', minWidth: '350px' }}>
            <div className='min-w-[80px]'>
                <img
                    className="object-cover w-20 rounded-t-lg md:rounded-none"
                    src={isDone ? '/assets/images/3dCheckmark.png' : img}
                    alt=""
                />
            </div>
            <Link href={`${link}`}>
                <div className="p-4">
                    <h5 className={`text-lg font-bold ${isDone ? 'text-gray-400' : ''}`}>
                        {title}
                    </h5>
                    <p className={`text-sm ${isDone ? 'text-gray-400' : ''}`}>
                        {description}
                    </p>
                </div>
            </Link>
        </div>
    );
    

    return (
        <div className="flex h-full flex-col overflow-hidden">
            <div className='items-start p-2'>
                <button type="button" className="hover:text-primary xl:hidden" onClick={props.toggleChatMenu}>
                    <IconMenu />
                </button>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
                <h2 className="text-2xl mb-4 ">Get Started with Cekat AI!</h2>
                <div className="flex flex-col gap-4">
                    <LinkComponent title="1. Link an Inbox" description="Start receiving messages from your messaging channels!" link="inboxes/new-inbox" img="/assets/images/3dInbox.png" isDone={props.inboxCheck}/>
                    <LinkComponent title="2. Create a Chatbot" description="Answer incoming messages with custom AI Chatbot" link="chatbots/chatbot-list" img="/assets/images/3dAI.png" isDone={props.chatbotCheck}/>
                    <LinkComponent title="3. Invite Agents" description="Invite your team to help respond to chats" link="users/agent-management" img="/assets/images/3dAgent.png" isDone={props.agentCheck}/>
                    <LinkComponent title="4. Add Agents to Inbox" description="Assign your agents to inboxes" link="inboxes/inbox-list" img="/assets/images/3dLink.png" isDone={props.agentsInboxCheck}/>
                </div>
            </div>
        </div>

    );      


};

export default OnboardingContainer;

