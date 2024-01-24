// Define a type for the `completedDateTime` property
interface CompletedDateTime {
    dateTime: string;
    timeZone: string;
  }
  
  // Define the main type for the entire object
  export interface TodoItem {
    "@odata.etag": string;
    importance: string;
    isReminderOn: boolean;
    status: string;
    title: string;
    createdDateTime: string;
    lastModifiedDateTime: string;
    hasAttachments: boolean;
    categories: string[];
    id: string;
    body: {
      content: string;
      contentType: string;
    };
    completedDateTime: CompletedDateTime | null; // Use `null` if it can be optional
  }
  
  