import { sp } from "@pnp/sp";
import "@pnp/sp/items";
import "@pnp/sp/lists";

export interface IFeedbackData {
  comment: string;
  user: string;
  date: Date;
}

export const submitFeedback = async (feedback: IFeedbackData) => {
  try {
    await sp.web.lists.getByTitle("Feedback").items.add({
      Title: feedback.comment, 
      User: feedback.user,
      Date: feedback.date
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};
