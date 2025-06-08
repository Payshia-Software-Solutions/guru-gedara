
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Icons from '@/components/icons';

export default function AdminStudentPaymentsPage() {
  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold text-primary">Student Payments</h1>
        {/* Potential filter or action buttons can go here */}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Student Payments</CardTitle>
          <CardDescription>
            View payment history, manage subscriptions, and issue refunds. This section is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 border-2 border-dashed border-border rounded-lg text-center">
            <Icons.CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold text-foreground">Student Payment Management Coming Soon</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Functionality to manage student payments is being developed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
