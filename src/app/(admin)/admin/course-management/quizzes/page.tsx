
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Icons from '@/components/icons';
import { Button } from "@/components/ui/button";

export default function AdminCourseQuizzesPage() {
  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold text-primary">Course Quizzes</h1>
        <Button>
            <Icons.PlusCircle className="mr-2 h-5 w-5" />
            Create New Quiz
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Course Quizzes</CardTitle>
          <CardDescription>
            Create, edit, and manage quizzes for all courses. This section is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 border-2 border-dashed border-border rounded-lg text-center">
            <Icons.HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold text-foreground">Quiz Creation Tools Coming Soon</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Functionality to create and manage course quizzes is being developed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
