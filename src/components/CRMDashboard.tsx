
import React from 'react';
import { TrendingUp, Users, Code, Target, Eye, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const statsData = [
  {
    title: 'Total Customers',
    value: '1,248',
    change: '+12.5% from last month',
    changeType: 'positive',
    icon: Users,
    color: 'blue'
  },
  {
    title: 'Active Users',
    value: '962',
    change: '+8.2% from last month',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'green'
  },
  {
    title: 'API Requests',
    value: '24,456',
    change: '+22.3% from last month',
    changeType: 'positive',
    icon: Code,
    color: 'purple'
  },
  {
    title: 'Conversion Rate',
    value: '4.8%',
    change: '-1.2% from last month',
    changeType: 'negative',
    icon: Target,
    color: 'yellow'
  }
];

const recentApiCalls = [
  { method: 'GET', endpoint: '/api/customers', status: 'Success', time: '2s ago' },
  { method: 'POST', endpoint: '/api/customers', status: 'Created', time: '5m ago' },
  { method: 'PATCH', endpoint: '/api/customers/123', status: 'Success', time: '12m ago' },
  { method: 'GET', endpoint: '/api/analytics', status: 'Success', time: '1h ago' },
  { method: 'DELETE', endpoint: '/api/customers/456', status: 'Failed', time: '2h ago' }
];

const recentCustomers = [
  { id: 'JD', name: 'John Doe', customerId: '#4532', status: 'Active', email: 'john.doe@example.com', lastActive: '2 hours ago' },
  { id: 'AS', name: 'Alice Smith', customerId: '#4531', status: 'Active', email: 'alice.smith@example.com', lastActive: '1 day ago' }
];

export const CRMDashboard: React.FC = () => {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-blue-600 bg-blue-50';
      case 'POST': return 'text-green-600 bg-green-50';
      case 'PATCH': return 'text-yellow-600 bg-yellow-50';
      case 'DELETE': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'text-green-600 bg-green-50';
      case 'Created': return 'text-green-600 bg-green-50';
      case 'Failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className={`text-sm mt-1 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-100' :
                    stat.color === 'green' ? 'bg-green-100' :
                    stat.color === 'purple' ? 'bg-purple-100' : 'bg-yellow-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'purple' ? 'text-purple-600' : 'text-yellow-600'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Customer Activity</CardTitle>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                <option>Last 90 days</option>
                <option>Last 30 days</option>
                <option>Last 7 days</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center text-gray-500">
              <p>Chart visualization would go here</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent API Calls */}
        <Card>
          <CardHeader>
            <CardTitle>Recent API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApiCalls.map((call, index) => (
                <div key={index} className="flex items-center space-x-3 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(call.method)}`}>
                    {call.method}
                  </span>
                  <span className="flex-1 text-sm text-gray-900 font-mono">{call.endpoint}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(call.status)}`}>
                    {call.status}
                  </span>
                  <span className="text-xs text-gray-500">{call.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Customers */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Customers</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">CUSTOMER</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">STATUS</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">EMAIL</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">LAST ACTIVE</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.map((customer, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                          {customer.id}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <p className="text-sm text-gray-500">Customer ID: {customer.customerId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{customer.email}</td>
                    <td className="py-4 px-4 text-sm text-gray-500">{customer.lastActive}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
