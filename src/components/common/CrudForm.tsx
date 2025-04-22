
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'date' | 'textarea' | 'select' | 'number';
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    required?: boolean | string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}

interface CrudFormProps<T> {
  title: string;
  fields: FormField[];
  onSubmit: (data: T) => void;
  defaultValues?: Partial<T>;
  isLoading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

export function CrudForm<T extends Record<string, any>>({
  title,
  fields,
  onSubmit,
  defaultValues = {},
  isLoading = false,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  onCancel,
}: CrudFormProps<T>) {
  const { toast } = useToast();

  // Dynamically build the Zod schema based on field definitions
  const buildZodSchema = () => {
    const schema: Record<string, any> = {};
    
    fields.forEach((field) => {
      let fieldSchema: any = z.string();
      
      if (field.type === 'email') {
        fieldSchema = z.string().email({ message: 'Invalid email address' });
      } else if (field.type === 'number') {
        fieldSchema = z.coerce.number();
      }
      
      if (field.validation?.required) {
        const message = typeof field.validation.required === 'string'
          ? field.validation.required
          : `${field.label} is required`;
        fieldSchema = fieldSchema.min(1, { message });
      } else {
        fieldSchema = fieldSchema.optional();
      }
      
      if (field.validation?.min && field.type === 'number') {
        fieldSchema = fieldSchema.min(field.validation.min, {
          message: `${field.label} must be at least ${field.validation.min}`,
        });
      }
      
      if (field.validation?.max && field.type === 'number') {
        fieldSchema = fieldSchema.max(field.validation.max, {
          message: `${field.label} must be at most ${field.validation.max}`,
        });
      }
      
      if (field.validation?.minLength) {
        fieldSchema = fieldSchema.min(field.validation.minLength, {
          message: `${field.label} must be at least ${field.validation.minLength} characters`,
        });
      }
      
      if (field.validation?.maxLength) {
        fieldSchema = fieldSchema.max(field.validation.maxLength, {
          message: `${field.label} must be at most ${field.validation.maxLength} characters`,
        });
      }
      
      if (field.validation?.pattern) {
        fieldSchema = fieldSchema.regex(field.validation.pattern.value, {
          message: field.validation.pattern.message,
        });
      }
      
      schema[field.name] = fieldSchema;
    });
    
    return z.object(schema);
  };

  const formSchema = buildZodSchema();
  
  // Create the form
  const form = useForm<T>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as any,
  });

  // Handle form submission
  const handleSubmit = (data: T) => {
    onSubmit(data);
    toast({
      title: "Form submitted",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as any}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {field.type === 'textarea' ? (
                      <Textarea
                        placeholder={field.placeholder}
                        {...formField}
                      />
                    ) : field.type === 'select' ? (
                      <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === 'date' ? (
                      <Input
                        type="date"
                        {...formField}
                        value={
                          typeof formField.value === 'string'
                            ? formField.value.split('T')[0]
                            : formField.value
                        }
                      />
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...formField}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="flex gap-3 pt-4 justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                {cancelLabel}
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : submitLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
