
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MobileCardProps {
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'success' | 'warning' | 'destructive';
  };
  fields: {
    label: string;
    value: string | React.ReactNode;
  }[];
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'destructive' | 'ghost';
    icon?: React.ReactNode;
  }[];
  className?: string;
}

const badgeVariants = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  destructive: 'bg-red-100 text-red-800',
};

export const MobileCard: React.FC<MobileCardProps> = ({
  title,
  subtitle,
  badge,
  fields,
  actions,
  className,
}) => {
  return (
    <div className={cn(
      'bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 shadow-sm',
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
              {subtitle}
            </p>
          )}
        </div>
        {badge && (
          <span className={cn(
            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
            badgeVariants[badge.variant || 'default']
          )}>
            {badge.text}
          </span>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-2 mb-4">
        {fields.map((field, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {field.label}:
            </span>
            <span className="text-sm text-gray-900 dark:text-white text-right flex-1 ml-2 truncate">
              {field.value}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-slate-700">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              size="sm"
              onClick={action.onClick}
              className="flex-1 min-w-0"
            >
              {action.icon && <span className="mr-1">{action.icon}</span>}
              <span className="truncate">{action.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
