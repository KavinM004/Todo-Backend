// Import necessary libraries
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from a.env file
dotenv.config();

// Create a new email transport object using Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other email services
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or an app-specific password
  },
});

// Function to send an email when a new todo item is added
export const sendNewTodoEmail = async (todo) => {
  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: "kavikavi7676@gmail.com", // Recipient's email address
    subject: "New Todo Added", // Email subject
    text: `A new todo has been added:\n\nTitle: ${todo.title}\nDescription: ${todo.description}`, // Email body
  };

  // Try to send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully"); // Log success message
  } catch (error) {
    console.error("Error sending email:", error); // Log error message
  }
};

export const sendCompletionEmail = async (todo) => {
  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: "kavikavi7676@gmail.com", // Recipient's email address
    subject: "Todo Completed", // Email subject
    text: `A todo has been completed:\n\nTitle: ${todo.title}\nDescription: ${todo.description}\nCompleted On: ${todo.completedOn}`, // Email body
  };

  // Try to send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Completion email sent successfully"); // Log success message
  } catch (error) {
    console.error("Error sending completion email:", error); // Log error message
  }
};

