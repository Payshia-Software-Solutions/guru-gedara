
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Icons from '@/components/icons';

export default function AdminStudentReportsPage() {
  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold text-primary">Student Reports</h1>
        {/* Potential filter or export buttons can go here */}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Generate Student Reports</CardTitle>
          <CardDescription>
            View student progress, performance analytics, and generate reports. This section is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 border-2 border-dashed border-border rounded-lg text-center">
            <Icons.FileSignature className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold text-foreground">Student Reporting Tools Coming Soon</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Functionality to generate and view student reports is being developed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
