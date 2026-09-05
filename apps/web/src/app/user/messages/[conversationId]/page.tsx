'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Send, MoreVertical, Phone, FileText, 
  Calendar, Home, User, Clock, Paperclip
} from 'lucide-react';
import BuyerPageShell from '../../../../components/organisms/BuyerPageShell';
import { buyerMessages, buyerProperties } from '../../../../lib/buyer-data';

export default function MessageConversationPage() {
  const params = useParams();
  const router = useRouter();
  const [messageText, setMessageText] = useState('');
  
  const conversation = buyerMessages.find(m => m.id === params.conversationId);
  const property = conversation ? buyerProperties.find(p => p.id === conversation.propertyId) : null;

  if (!conversation || !property) {
    return (
      <BuyerPageShell>
        <div className="text-center py-12">
          <h1 className="font-display text-2xl">Conversation not found</h1>
          <Link href="/user/messages" className="mt-4 inline-block text-[#173D2B]">
            Back to messages
          </Link>
        </div>
      </BuyerPageShell>
  );
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would make an API call
      setMessageText('');
    }
  };

  // Mock messages for the conversation
  const conversationMessages = [
    {
      id: 1,
      sender: 'them',
      text: conversation.lastMessage,
      time: conversation.lastMessageTime,
    },
    {
      id: 2,
      sender: 'me',
      text: 'Thanks for the information. I\'d like to schedule a viewing.',
      time: '1 hour ago',
    },
    {
      id: 3,
      sender: 'them',
      text: 'I can schedule that viewing for Saturday at 2pm. Does that work for you?',
      time: '2 hours ago',
    },
  ];

  return (
    <BuyerPageShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/user/messages" className="flex items-center gap-2 text-sm text-[#66706A] hover:text-[#172019]">
            <ArrowLeft size={16} />
            Back to messages
          </Link>
        </div>

        {/* Conversation Header */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#173D2B] text-sm font-semibold text-white">
                {conversation.contactName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="font-display text-lg">{conversation.contactName}</h2>
                <p className="text-sm text-[#66706A]">{conversation.contactRole}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDE2DD] text-[#66706A] hover:bg-[#F0F2F0]">
                <Phone size={18} />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDE2DD] text-[#66706A] hover:bg-[#F0F2F0]">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Property Context */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 rounded-md bg-[#E7F0E5] overflow-hidden">
              <img
                src={property.images[0]}
                alt={property.address}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{property.address}</h3>
              <p className="text-sm text-[#66706A]">{property.city}, {property.state}</p>
              <Link
                href={`/user/property/${property.slug}`}
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#173D2B] hover:underline"
              >
                View property
              </Link>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-6 space-y-4">
          {conversationMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 ${
                  msg.sender === 'me'
                    ? 'bg-[#173D2B] text-white'
                    : 'bg-[#F0F2F0] text-[#172019]'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`mt-1 text-xs ${msg.sender === 'me' ? 'text-white/70' : 'text-[#66706A]'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-4">
          <div className="flex gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE2DD] text-[#66706A] hover:bg-[#F0F2F0]">
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]"
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#173D2B] text-white hover:bg-[#123022] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border border-[#DDE2DD] bg-white p-4">
          <h3 className="font-medium mb-3">Quick actions</h3>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full border border-[#DDE2DD] px-3 py-1.5 text-sm text-[#66706A] hover:bg-[#F0F2F0]">
              Schedule viewing
            </button>
            <button className="rounded-full border border-[#DDE2DD] px-3 py-1.5 text-sm text-[#66706A] hover:bg-[#F0F2F0]">
              Request more info
            </button>
            <button className="rounded-full border border-[#DDE2DD] px-3 py-1.5 text-sm text-[#66706A] hover:bg-[#F0F2F0]">
              Make offer
            </button>
          </div>
        </div>
      </div>
    </BuyerPageShell>
  );
}
