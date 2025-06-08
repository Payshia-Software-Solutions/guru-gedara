
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Icons from "@/components/icons"; // Assuming Icons.ShieldAlert or similar for admin
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">Welcome to the ගුරු ගෙදර E-School Admin Panel.</p>
        </div>
        {/* Placeholder for a potential global admin action button or info */}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <Icons.Users className="w-7 h-7 text-primary" />
                <CardTitle className="text-xl font-semibold">Student Management</CardTitle>
            </div>
            <CardDescription>View, edit, and manage student accounts and enrollments.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/admin/students">Manage Students</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
             <div className="flex items-center space-x-3 mb-2">
                <Icons.BookOpenText className="w-7 h-7 text-primary" />
                <CardTitle className="text-xl font-semibold">LMS Content</CardTitle>
            </div>
            <CardDescription>Manage courses, lessons, quizzes, and other learning materials.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/admin/lms-content">Manage Content</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <Icons.CreditCard className="w-7 h-7 text-primary" />
                <CardTitle className="text-xl font-semibold">Payments</CardTitle>
            </div>
            <CardDescription>Track student payments and manage financial records. (Coming Soon)</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled>Manage Payments</Button>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
                <Icons.Briefcase className="w-7 h-7 text-primary" />
                <CardTitle className="text-xl font-semibold">Staff Management</CardTitle>
            </div>
            <CardDescription>Manage teacher and admin staff accounts. (Coming Soon)</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled>Manage Staff</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Quick stats about the platform. (Placeholder)</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Students</h3>
                <p className="text-2xl font-bold">120</p>
            </div>
            <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Active Courses</h3>
                <p className="text-2xl font-bold">4</p>
            </div>
            <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Revenue (This Month)</h3>
                <p className="text-2xl font-bold">LKR 50,000</p>
            </div>
            <div className="p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Pending Submissions</h3>
                <p className="text-2xl font-bold">12</p>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
