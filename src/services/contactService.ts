import { prisma } from '@/lib/prisma';

export interface CreateContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function createContact(data: CreateContactData) {
  return await prisma.contact.create({
    data,
  });
}

export async function getContacts() {
  return await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getContactById(id: string) {
  return await prisma.contact.findUnique({
    where: { id },
  });
}

export async function markContactAsRead(id: string, isRead: boolean = true) {
  return await prisma.contact.update({
    where: { id },
    data: { isRead },
  });
}

export async function deleteContact(id: string) {
  return await prisma.contact.delete({
    where: { id },
  });
}

export async function getUnreadContactsCount() {
  return await prisma.contact.count({
    where: { isRead: false },
  });
}

