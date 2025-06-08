
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Icons from '@/components/icons';

export default function AdminPaymentReportsPage() {
  return (
    <div className="space-y-6 p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold text-primary">Payment Reports</h1>
        {/* Potential filter or export buttons can go here */}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Generate Payment Reports</CardTitle>
          <CardDescription>
            View transaction history, revenue analytics, and generate financial reports. This section is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6 p-8 border-2 border-dashed border-border rounded-lg text-center">
            <Icons.Banknote className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold text-foreground">Payment Reporting Tools Coming Soon</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Functionality to generate and view payment reports is being developed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
