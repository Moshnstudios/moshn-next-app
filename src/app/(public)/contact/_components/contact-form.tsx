"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { toast } from "sonner";
import { $ContactInput } from "~/lib/schema";
import { Form, useForm } from "~/app/_components/form";
import Title from "~/app/_components/title";
import { FormTextInput } from "~/app/_components/form-text-input";
import { FormSelect } from "~/app/_components/form-select";
import { FormTextAreaInput } from "~/app/_components/form-text-area-input";
import { api } from "~/trpc/react";

export default function ContactForm() {
  const [isSuccess, setSuccess] = useState(false);

  const { mutate, isPending } = api.formsRoutes.contact.useMutation({
    onSuccess: () => setSuccess(true),
    onError: () => {
      toast.error("Something went wrong, please try again later.");
    },
  });

  const { form, handleSubmit } = useForm({
    logger: true,
    schema: $ContactInput,
    onSubmit: (input) => mutate(input),
  });

  return (
    <div className="px-6 py-20 dark">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center">
        {!isSuccess ? (
          <>
            <Title text="Connect With Us" className="mb-16 text-3xl" />

            <Form form={form} className="w-full">
              <FormTextInput
                form={form}
                name="name"
                label="Name"
                placeholder="Enter your name"
                className="pb-10"
              />

              <FormTextInput
                form={form}
                name="phone_number"
                label="Phone Number"
                placeholder="Enter your phone number"
                className="pb-14"
              />

              <FormTextInput
                form={form}
                name="email"
                label="Email"
                placeholder="Enter your email"
                className="pb-14"
              />

              <FormTextInput
                form={form}
                name="company"
                label="Company"
                placeholder="Enter your company name"
                className="pb-14"
              />

              <FormSelect
                form={form}
                name="contact_preference"
                label="Contact Preference"
                placeholder="Email or Phone"
                className="pb-10"
                options={[
                  { label: "Email", value: "Email" },
                  { label: "Phone", value: "Phone" },
                ]}
                selectionMode="single"
              />

              <FormTextAreaInput
                form={form}
                name="project_details"
                label="Project Details"
                placeholder="Enter your project details"
                className="pb-10"
              />

              <div className="flex w-full justify-end">
                <Button
                  size="lg"
                  className="glass"
                  isLoading={isPending}
                  onPress={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="max-w-xl text-center text-xl">
              Thanks for reaching us, Our representative will shortly get in
              touch with you. Meanwhile you can explore our projects here:
            </div>

            <Button className="glass" as={Link} href="/projects">
              View Projects
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
