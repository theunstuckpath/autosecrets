import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../config/firebase';
import { useAuthStore } from '../store/useAuthStore';
import type { Notification } from '../types/notification';

export function useNotifications() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading, error } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => {
      return new Promise<Notification[]>((resolve, reject) => {
        if (!user) {
          resolve([]);
          return;
        }

        const notificationsRef = ref(db, `notifications/${user.id}`);
        const unsubscribe = onValue(notificationsRef, (snapshot) => {
          const data = snapshot.val();
          if (!data) {
            resolve([]);
            return;
          }

          const notificationsList = Object.entries(data).map(([id, notification]) => ({
            id,
            ...(notification as Omit<Notification, 'id'>)
          }));

          resolve(notificationsList.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
        }, reject);

        return () => unsubscribe();
      });
    },
    enabled: !!user,
  });

  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      if (!user) return;
      
      const updates = {
        [`notifications/${user.id}/${notificationId}/read`]: true,
        [`notifications/${user.id}/${notificationId}/updatedAt`]: new Date().toISOString()
      };

      await update(ref(db), updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', user?.id] });
    },
  });

  return {
    notifications,
    isLoading,
    error,
    markAsRead: markAsRead.mutate,
  };
}
