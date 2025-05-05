"use client";

import { Button, Link } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { Form, useForm } from "~/app/_components/form";
import { FormSelect } from "~/app/_components/form-select";
import { FormTextAreaInput } from "~/app/_components/form-text-area-input";
import { FormTextInput } from "~/app/_components/form-text-input";
import Title from "~/app/_components/title";
import { $CareerInput } from "~/lib/schema";
import { api } from "~/trpc/react";

export default function CareerForm() {
  const [isSuccess, setSuccess] = useState(false);

  const { mutate, isPending } = api.formsRoutes.career.useMutation({
    onSuccess: () => setSuccess(true),
    onError: () => {
      toast.error("Something went wrong, please try again later.");
    },
  });

  const { form, handleSubmit } = useForm({
    logger: true,
    schema: $CareerInput,
    onSubmit: (input) => mutate(input),
  });

  return (
    <div className="bg-black px-6 py-20 dark">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center">
        {!isSuccess ? (
          <>
            <div className="mb-16 flex max-w-xl flex-col items-center justify-center text-center">
              <Title text="Join Our Team" className="text-3xl" />
              <p>
                We’re always looking for talented individuals to join us. If
                you’re passionate about CGI, storytelling, and creating stunning
                visuals, apply below!
              </p>
            </div>

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
                name="email"
                label="Email"
                placeholder="Enter your email"
                className="pb-10"
              />

              <FormTextInput
                form={form}
                name="phone_number"
                label="Phone Number"
                placeholder="Enter your phone number"
                className="pb-10"
              />

              <FormSelect
                form={form}
                name="work_type"
                label="Preferred Work Type"
                placeholder="Full Time, Part Time or Freelance"
                className="pb-10"
                options={[
                  { label: "Full Time", value: "Full Time" },
                  { label: "Part Time", value: "Part Time" },
                  { label: "Freelance", value: "Freelance" },
                ]}
                selectionMode="single"
              />

              <FormTextInput
                form={form}
                name="position"
                label="Position Applied For"
                placeholder="Enter your position"
                className="pb-10"
              />

              <FormTextInput
                form={form}
                name="portfolio_url"
                label="Link To Your Portfolio"
                placeholder="https://www.myportfolio.com"
                className="pb-10"
              />

              <FormTextAreaInput
                form={form}
                name="about_yourself"
                label="About Yourself"
                placeholder="Tell us about yourself"
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
