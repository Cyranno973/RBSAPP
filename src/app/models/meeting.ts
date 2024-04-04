export enum MeetingType {
  immediate = 'immediate',
  recurring = 'recurring',
  scheduled = 'scheduled',
}
export interface SearchHistory {
  endDate?: string,
  startDate?: string
  id?: string
}
export interface Recording {
  recordingName: string,
  recordingId: string,
  downloadUrl: string,
  fileSize: number,
  shareUrl: string
}

export interface Meeting {
  startTime: string,
  lastName: string,
  duration: string,
  numAttendees: string,
  accountKey: string,
  email: string,
  sessionId: string,
  subject: string,
  locale: string,
  organizerKey: string,
  meetingId: string,
  meetingType: MeetingType,
  firstName: string,
  endTime: string,
  conferenceCallInfo: string,
  recording: Recording
}
