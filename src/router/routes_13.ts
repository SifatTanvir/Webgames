import { RouteConfig } from "./routeType";
import SalonAppointmentDashboard, { PASSWORD_SalonAppointment, TASK_ID_SalonAppointment } from "../pages/SalonAppointment";
import EventTicketingQRApp, { PASSWORD_EventTicketQR, TASK_ID_EventTicketQR } from "../pages/EventTracking";
import BookBazaarApp, { PASSWORD_BookBazaar, TASK_ID_BookBazaar } from "../pages/BookBazar";
import EcommerceDiscount, { PASSWORD_EcommerceDiscount, TASK_ID_EccomerceDiscount } from "../pages/EcommerceDiscount";
import MovieSeatBooking, { PASSWORD_MovieGroupBooking, TASK_ID_MovieGroupBooking } from "../pages/MovieGroupBooking";
import GanttProjectScheduler, { PASSWORD_GanttProjectChart, TASK_ID_GanttProjectChart } from "../pages/ProjectChartReschedule";
import TreatmentPlanTracker, { PASSWORD_TreatmentPlanTracker, TASK_ID_TreatmentPlanTracker } from "../pages/TreatmentPlanTracker";
import FlightRebooking, { PASSWORD_RescheduleFlightTicket, TASK_ID_RescheduleFlightTicket } from "../pages/RescheduleFlightTicket";
import JobApplication, { PASSWORD_JobApplication, TASK_ID_JobApplication } from "../pages/JobApplication";
import TransferMoneySimulation, { PASSWORD_TransferMoney, TASK_ID_TransferMoney } from "../pages/TransferMoneySimulation";
import AssignPrioritizeTasks, { PASSWORD_AssignPrioritizeTasks, TASK_ID_AssignPrioritizeTasks } from "../pages/AssignPrioritizeTasks";
export const routes_13: RouteConfig[] = [
    {
        path: TASK_ID_SalonAppointment,
        title: "Salon Appointment System",
        description: "Your task is to book a slot in salon to complete the task and return the password.Follow the instruction in Quick Booking Tip and with exact given detail book appointment for salon. Upon successful submission with these exact inputs, a confirmation message along with the password will be revealed, return this password as your answer.",
        icon: "💇‍♀️",
        component: SalonAppointmentDashboard,
        tags: ["form", "booking", "conditional-logic", "react", "puzzle"],
        difficulty: "easy",
        password: PASSWORD_SalonAppointment,
        variant: "easy",
        requires_file_upload: false
    }, {
        path: TASK_ID_EventTicketQR,
        title: "Event Ticket Reservation with QR",
        description: "Your task is to complete a ticket booking for the Event Track challenge and return the password. Follow the tips instruction from site and book the event with the exact given details in instruction. If every detail matches the expected combination, your booking will be confirmed and the password will be revealed along with the QR code, return that password as your answer.",
        icon: "🎟️",
        component: EventTicketingQRApp,
        tags: ["reservation", "qr-code", "form", "react", "puzzle", "event"],
        difficulty: "easy",
        password: PASSWORD_EventTicketQR,
        variant: "easy",
        requires_file_upload: false
    }, {
        path: TASK_ID_BookBazaar,
        title: "BookBazaar – Buy/Sell Old Books",
        description: "Your task is to the buy book from the list to return the password. Follow the instruction in site and purchase book following each instruction exacty. After that if every detail matches the expected combination, your purchase will be confirmed and the password will be revealed and return that password as your answer.",
        icon: "📚",
        component: BookBazaarApp,
        tags: ["e-commerce", "search", "chat", "react", "puzzle", "books"],
        difficulty: "medium",
        password: PASSWORD_BookBazaar,
        variant: "base",
        requires_file_upload: false
    }, {
        path: TASK_ID_EccomerceDiscount,
        title: "E-commerce Discount",
        description: "Your task is to the add two product from the list to cart, apply coupen to confirm purchase and return the password. Follow the instruction in site and prchase products with the exact given details in instruction. If every detail matches the expected combinations, your purchase will be confirmed and the password will be revealed, return that password as you answer.",
        icon: "🛒",
        component: EcommerceDiscount,
        tags: ["e-commerce", "discount", "coupon", "react", "puzzle", "checkout"],
        difficulty: "medium",
        password: PASSWORD_EcommerceDiscount,
        variant: "base",
        requires_file_upload: false
    }, {
        path: TASK_ID_MovieGroupBooking,
        title: "Movie Ticket Group Seat Booking",
        description: "Your task is to book movie for you group and all selected seats are adjacent or within close proximity to return the password. Follow the instruction in site and book the tickets with the exact details given in instruction. If every detail matches the expected combinations, your booking will be confirmed and the password will be revealed, return that password as your answer.",
        icon: "🎬",
        component: MovieSeatBooking,
        tags: ["movie booking", "seats"],
        difficulty: "medium",
        password: PASSWORD_MovieGroupBooking,
        variant: "base",
        requires_file_upload: false
    }, {
        path: TASK_ID_GanttProjectChart,
        title: "Gantt Project Scheduler",
        description: "Your task is to schdule the project to a team withing deadline and return the password. Follow the instruction in site and schedule the project for the exact given details in the instruction.. After following all instruction schedule the project and if every detail matches the expected combinations, your project will be schedule successfully and the password will be revealed then return that password as your answer.",
        icon: "📊",
        component: GanttProjectScheduler,
        tags: ["project management", "gantt chart", "scheduling"],
        difficulty: "medium",
        password: PASSWORD_GanttProjectChart,
        variant: "base",
        requires_file_upload: false
    }, {
        path: TASK_ID_TreatmentPlanTracker,
        title: "Treatment Plan Tracker",
        description: "Your task is to have a tratement plan for medical problem to return the password. For the Chronic Migraine problem choose Topiramate as medicine and plan for 15 days treatement with 250mg dosage strength for every 12 hours which will be 08:00 and 20:00. After it visualise the schedule then confirm the schedule. After scheduling the treatement with exact given details, password will get revealed, return that password as your answer.",
        icon: "🩺 ",
        component: TreatmentPlanTracker,
        tags: ["treatement", "static"],
        difficulty: "medium",
        password: PASSWORD_TreatmentPlanTracker,
        variant: "base",
        requires_file_upload: false
    }, {
        path: TASK_ID_RescheduleFlightTicket,
        title: "Flight Ticket Rebooking",
        description: "Your task is to book the ticket for the cancelled flight and retrieve the password. Follow the instructions on the site and book the ticket using the exact details provided. Once all instructions are followed correctly and the details match the expected criteria, the flight ticket will be successfully booked, and the password will be revealed. Return that password as your answer.",
        icon: "✈️",
        component: FlightRebooking,
        tags: ["rebook ticket", "e-booking", "flight ticket"],
        difficulty: "medium",
        password: PASSWORD_RescheduleFlightTicket,
        variant: "base",
        requires_file_upload: false
    }, {
        path: TASK_ID_JobApplication,
        title: "Job Application",
        description: "Your task is to submit a job application and return the password. Submit a job application for a Python Backend Developer position using the following details: Name: `Alex Doe`, Email: `alex@email.com`, Mobile Number: `9876543210`, Work Experience: `5 years`, Skills: `Python, Django`, Interest: `Backend architecture`, Scenario Question: `Collaborate and handle it proactively`. Review the form, and if every detail matches the expected combination, the application will be submitted successfully and the password will be revealed. Return that password as your answer.",
        icon: "📄",
        component: JobApplication,
        tags: ["form", "static", "realistic", "multi-step"],
        difficulty: "hard",
        password: PASSWORD_JobApplication,
        variant: "hard",
        requires_file_upload: true
    }, {
        path: TASK_ID_TransferMoney,
        title: "Transfer Money Simulation",
        description: "Your task is to transfer money and then return a password. Transfer EUR 2500 from the Business Account to Alice Johnson's account number 987654321012 for the purpose of Project Payment. After transferring the money with the exact details, a password will be revealed. Return that password as your answer.",
        icon: "💸",
        component: TransferMoneySimulation,
        tags: ["banking", "multi-step", "form", "secure"],
        difficulty: "hard",
        password: PASSWORD_TransferMoney,
        variant: "hard",
        requires_file_upload: false
    }, {
        path: TASK_ID_AssignPrioritizeTasks,
        title: "Assign & Prioritize Tasks",
        description: "Your task is to assign the projects and priorities, and return the password. Assign `E-commerce Platform Development` to `Sarah Chen` with a deadline of 4 days after current date, `Mobile App UI/UX Redesign` to `Marcus Rodriguez` with a deadline of 7 days after current date, and `Data Analytics Dashboard` to `Lisa Thompson` with a deadline of 10 days after current date . Add the following milestones: for E-commerce Platform Development, add `Design Phase` and `Development Phase`; for Mobile App UI/UX Redesign, add `Research Phase` and `Prototype Phase`, for Data Analytics Dashboard , add `Data Collection` and `Analytics Setup`. Set project priorities as follows: `E-commerce Platform Development` → Internal priority: `High`, Client priority: `Critical`; `Mobile App UI/UX Redesign` → Internal priority: `Critical`, Client priority: `High`; `Data Analytics Dashboard` → Internal priority: `Medium`, Client priority: `Medium`. If every detail matches the expected combination, the password will be revealed. Return that password as your answer.",
        icon: "🗂️",
        component: AssignPrioritizeTasks,
        tags: ["teamwork", "planning", "multi-step"],
        difficulty: "easy",
        password: PASSWORD_AssignPrioritizeTasks,
        variant: "easy",
        requires_file_upload: false
    }
]