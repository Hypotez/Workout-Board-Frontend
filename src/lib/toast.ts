import type { ReactNode } from 'react';
import { toast, type ExternalToast } from 'sonner';

type ToastOptions = ExternalToast;

type ToastMessage = string | ReactNode;

export const showError = (message: ToastMessage, options?: ToastOptions) =>
  toast.error(message, options);

export const showSuccess = (message: ToastMessage, options?: ToastOptions) =>
  toast.success(message, options);

export const showInfo = (message: ToastMessage, options?: ToastOptions) =>
  toast(message, options);
