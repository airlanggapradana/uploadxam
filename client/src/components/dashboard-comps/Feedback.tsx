"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FeedbackInput } from "@/zod/zod.validation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserSession } from "@/hooks/context";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { env } from "@/env";

const Feedback = () => {
  const session = useUserSession();
  const form = useForm<FeedbackInput>({
    defaultValues: {
      email: "",
      message: "",
      feedback_rating: 0,
      feedback_type: "feature",
    },
  });

  const onSubmit: SubmitHandler<FeedbackInput> = async (d) => {
    try {
      emailjs.init({
        publicKey: "nr7zXwODAaCASokJ7",
      });
      const templateParams = {
        user_name: session.name,
        user_email: d.email,
        rating: d.feedback_rating,
        feedback_text: d.message,
        feedback_type: d.feedback_type,
        submitted_at: new Date().toLocaleString(),
      };
      const emailToUser = await emailjs.send(
        env.NEXT_PUBLIC_EMAIL_SERVICE,
        env.NEXT_PUBLIC_EMAILTOUSER_TEMPLATE,
        templateParams,
      );
      const emailToDev = await emailjs.send(
        env.NEXT_PUBLIC_EMAIL_SERVICE,
        env.NEXT_PUBLIC_EMAILTODEV_TEMPLATE,
        templateParams,
      );
      if (emailToDev && emailToUser) {
        toast.success("Feedback berhasil dikirim! Terima kasih ya.");
        form.reset();
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(`Gagal mengirim feedback: ${e.message}`);
      }
      toast.error("Gagal mengirim feedback. Coba lagi nanti ya.");
    }
  };
  return (
    <Card className="mx-auto w-full max-w-2xl p-6 md:p-8">
      <div className="">
        <h2 className="text-foreground mb-2 text-2xl font-bold md:text-3xl">
          Share Feedback Kamu
        </h2>
        <p className="text-muted-foreground">
          Bantu kami meningkatkan layanan dengan memberikan feedback kamu.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Rating Section */}
          <FormField
            control={form.control}
            name="feedback_rating"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-semibold">
                  Bagaimana pengalamanmu menggunakan layanan kami?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <div className="flex flex-wrap gap-3">
                      {["1", "2", "3", "4", "5"].map((rating) => (
                        <div
                          key={rating}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={rating}
                            id={`rating-${rating}`}
                          />
                          <Label
                            htmlFor={`rating-${rating}`}
                            className="cursor-pointer font-medium"
                          >
                            {rating === "1" && "😞 Ga puas"}
                            {rating === "2" && "😕 Cukup"}
                            {rating === "3" && "😐 Okelah"}
                            {rating === "4" && "😊 Mantap king"}
                            {rating === "5" && "😍 Gacor king"}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Feedback Type Section */}
          <FormField
            control={form.control}
            name="feedback_type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-semibold">
                  Jenis Feedbacknya apa nich?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {[
                        { value: "bug", label: "Bug Report" },
                        { value: "feature", label: "Feature Request" },
                        { value: "improvement", label: "Improvement" },
                        { value: "other", label: "Lainnya" },
                      ].map(({ value, label }) => (
                        <div
                          key={value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={value} id={`type-${value}`} />
                          <Label
                            htmlFor={`type-${value}`}
                            className="cursor-pointer font-medium"
                          >
                            {label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Section */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-semibold">
                  Pesan atau Saran Kamu
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tulis pesan atau saran kamu di sini..."
                    className="min-h-32 resize-none"
                    {...field}
                  />
                </FormControl>
                <p className="text-muted-foreground text-sm">
                  {field.value.length} characters
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Section */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-semibold">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <p className="text-muted-foreground text-sm">
                  Kita akan menghubungi kamu jika diperlukan.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full md:w-auto"
            size="lg"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default Feedback;
