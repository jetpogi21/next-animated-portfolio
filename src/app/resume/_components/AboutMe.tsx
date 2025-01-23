"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/Textarea";
import { useAboutMe, useUpdateAboutMe } from "../_hooks/use-about-me";
import { Loader2 } from "lucide-react";

export const AboutMe = () => {
  const { data: aboutMe } = useAboutMe();
  const { mutate: updateAboutMe, isPending } = useUpdateAboutMe();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const aboutMeText = formData.get("about_me") as string;
    updateAboutMe({ about_me: aboutMeText });
  };

  return (
    <Card className="p-4">
      <div className="flex justify-start">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              data-testid="edit-about-me-button"
            >
              {aboutMe ? "Edit About Me" : "Add About Me"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] w-[90vw]">
            <DialogHeader>
              <DialogTitle>About Me</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSave}
              className="space-y-4"
            >
              <Textarea
                name="about_me"
                defaultValue={aboutMe?.about_me ?? ""}
                placeholder="Write something about yourself..."
                className="min-h-[400px]"
                data-testid="about-me-textarea"
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
                data-testid="save-about-me-button"
              >
                {isPending ? (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                ) : null}
                {isPending ? "Saving..." : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};
