import { UUID } from './common';

export interface SocialMediaPost {
    id: UUID;
    content: string;
    platform: SocialPlatform;
    scheduledTime?: Date;
    mediaUrls?: string[];
    hashtags?: string[];
    engagement?: PostEngagement;
}

export interface PostEngagement {
    likes: number;
    shares: number;
    comments: number;
    reach: number;
    impressions: number;
}

export enum SocialPlatform {
    Twitter = 'twitter',
    LinkedIn = 'linkedin',
    Instagram = 'instagram',
    Discord = 'discord',
}

export interface ContentStrategy {
    id: UUID;
    targetAudience: string[];
    contentThemes: string[];
    postFrequency: {
        platform: SocialPlatform;
        postsPerDay: number;
        bestTimes: string[];
    }[];
    hashtagStrategy: string[];
}

export interface AnalyticsReport {
    id: UUID;
    period: {
        start: Date;
        end: Date;
    };
    metrics: {
        platform: SocialPlatform;
        followerGrowth: number;
        engagementRate: number;
        topPosts: UUID[];
        insights: string[];
    }[];
}

export interface Message {
    id: UUID;
    from: UUID;
    to: UUID;
    type: 'task' | 'response' | 'notification';
    content: any;
    timestamp: Date;
}
