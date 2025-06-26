
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Mail, MessageCircle, Phone, Send, Clock, CheckCheck } from 'lucide-react';

const Communications = () => {
  const [activeTab, setActiveTab] = useState('sms');

  const smsMessages = [
    {
      id: 1,
      contact: 'John Smith',
      message: 'Hi John, following up on our meeting yesterday...',
      timestamp: '10:30 AM',
      status: 'delivered',
      direction: 'outbound'
    },
    {
      id: 2,
      contact: 'Sarah Johnson',
      message: 'Thanks for the proposal. Can we schedule a call?',
      timestamp: '9:15 AM',
      status: 'read',
      direction: 'inbound'
    }
  ];

  const emails = [
    {
      id: 1,
      contact: 'Mike Davis',
      subject: 'Proposal for Marketing Automation',
      preview: 'Dear Mike, I hope this email finds you well...',
      timestamp: '2 hours ago',
      status: 'sent',
      direction: 'outbound'
    },
    {
      id: 2,
      contact: 'Emma Thompson',
      subject: 'Re: Partnership Opportunity',
      preview: 'Thank you for reaching out about the partnership...',
      timestamp: '1 day ago',
      status: 'replied',
      direction: 'inbound'
    }
  ];

  const teamsMessages = [
    {
      id: 1,
      contact: 'Alex Rodriguez',
      message: 'Great meeting today! Let\'s move forward with the proposal.',
      timestamp: '3:45 PM',
      status: 'delivered',
      direction: 'inbound'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCheck className="w-4 h-4 text-blue-500" />;
      case 'read': return <CheckCheck className="w-4 h-4 text-green-500" />;
      case 'sent': return <Send className="w-4 h-4 text-blue-500" />;
      case 'replied': return <MessageSquare className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'read': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'sent': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'replied': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Communications</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage all your customer communications in one place</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg">
              <MessageSquare className="w-4 h-4 mr-2" />
              New SMS
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg">
              <Mail className="w-4 h-4 mr-2" />
              New Email
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">SMS Sent</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">2,456</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Emails Sent</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">1,789</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Teams Messages</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">567</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Response Rate</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">78%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Communication Tabs */}
        <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 dark:bg-slate-700/30">
              <TabsTrigger value="sms" className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>SMS</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="teams" className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>MS Teams</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sms" className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">SMS Messages</h3>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                  {smsMessages.length} conversations
                </Badge>
              </div>
              {smsMessages.map((sms) => (
                <div key={sms.id} className="bg-white/10 dark:bg-slate-700/20 rounded-xl p-4 hover:bg-white/20 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {sms.contact.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white">{sms.contact}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{sms.direction}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(sms.status)}
                      <span className="text-sm text-slate-500 dark:text-slate-500">{sms.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 ml-13">{sms.message}</p>
                  <div className="flex justify-end mt-2">
                    <Badge className={getStatusColor(sms.status)}>{sms.status}</Badge>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="email" className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Email Conversations</h3>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                  {emails.length} conversations
                </Badge>
              </div>
              {emails.map((email) => (
                <div key={email.id} className="bg-white/10 dark:bg-slate-700/20 rounded-xl p-4 hover:bg-white/20 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {email.contact.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white">{email.contact}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{email.direction}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(email.status)}
                      <span className="text-sm text-slate-500 dark:text-slate-500">{email.timestamp}</span>
                    </div>
                  </div>
                  <h5 className="font-medium text-slate-800 dark:text-white mb-1 ml-13">{email.subject}</h5>
                  <p className="text-slate-700 dark:text-slate-300 ml-13">{email.preview}</p>
                  <div className="flex justify-end mt-2">
                    <Badge className={getStatusColor(email.status)}>{email.status}</Badge>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="teams" className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">MS Teams Messages</h3>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                  {teamsMessages.length} conversations
                </Badge>
              </div>
              {teamsMessages.map((teams) => (
                <div key={teams.id} className="bg-white/10 dark:bg-slate-700/20 rounded-xl p-4 hover:bg-white/20 dark:hover:bg-slate-700/30 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {teams.contact.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white">{teams.contact}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{teams.direction}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(teams.status)}
                      <span className="text-sm text-slate-500 dark:text-slate-500">{teams.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 ml-13">{teams.message}</p>
                  <div className="flex justify-end mt-2">
                    <Badge className={getStatusColor(teams.status)}>{teams.status}</Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Communications;
