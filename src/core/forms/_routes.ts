import { $CareerInput, $ContactInput } from "~/lib/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import axios from "axios";
import { TRPCError } from "@trpc/server";

type FormResponse = {
  status: "validation_failed";
  message: string;
  invalid_fields: {
    field: string;
    message: string;
    error_id: string;
  };
  posted_data_hash: string;
  into: string;
};

export const formsRoutes = createTRPCRouter({
  contact: publicProcedure.input($ContactInput).mutation(async ({ input }) => {
    const form = new FormData();

    form.append("your-name", input.name);
    form.append("your-email", input.email);
    form.append("your-phone", input.phone_number);
    form.append("your-company", input.company);
    form.append("your-project-details", input.project_details);
    form.append("your-contact-preference", input.contact_preference);

    const result = await axios
      .post<FormResponse>(
        "https://admin.moshnstudios.com/wp-json/contact-form-7/v1/contact-forms/178/feedback",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      )
      .catch(() => {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      });

    console.log(result.data);
    if (result.data.status === "validation_failed") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid fields, please check your input and try again.",
      });
    }
  }),

  career: publicProcedure.input($CareerInput).mutation(async ({ input }) => {
    const form = new FormData();

    form.append("your-name", input.name);
    form.append("your-email", input.email);
    form.append("your-phone-number", input.phone_number);
    form.append("your-position", input.position);
    form.append("your-portfolio-url", input.portfolio_url);
    form.append("about-yourself", input.about_yourself);
    form.append("your-work-type", input.work_type);

    const result = await axios
      .post<FormResponse>(
        "https://admin.moshnstudios.com/wp-json/contact-form-7/v1/contact-forms/177/feedback",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      )
      .catch(() => {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      });

    if (result.data.status === "validation_failed") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid fields, please check your input and try again.",
      });
    }
  }),
});
