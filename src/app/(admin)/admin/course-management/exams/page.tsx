
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Icons from '@/components/icons';
import { Button } from "@/components/ui/button";

export default function AdminCourseExamsPage() {
  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold text-primary">Course Exams</h1>
        <Button>
            <Icons.PlusCircle className="mr-2 h-5 w-5" />
            Create New Exam
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Course Exams</CardTitle>
          <CardDescription>
            Create, schedule, and manage exams for all courses. This section is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 border-2 border-dashed border-border rounded-lg text-center">
            <Icons.FileCheck2 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold text-foreground">Exam Management System Coming Soon</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Functionality to create and manage course exams is being developed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
