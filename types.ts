export interface NavItem {
  label: string;
  path: string;
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  uploadedBy?: string;
  timestamp: number;
  approved: boolean;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface WeddingEvent {
  title: string;
  time: string;
  location: string;
  address: string;
  description: string;
  icon: 'ceremony' | 'reception' | 'party';
  mapUrl: string;
}

export interface PartyMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  side: 'bride' | 'groom';
}

export enum RSVPStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export interface GuestRSVP {
  id: string;
  name: string;
  email: string;
  status: RSVPStatus;
  guestsCount: number;
  dietaryRestrictions?: string;
  message?: string;
}
