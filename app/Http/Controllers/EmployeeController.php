<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = User::latest()->get();

        return Inertia::render('Admin/Employees/Index', [
            'employees' => $employees
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt('password'),
            'department' => $request->department,
            'position' => $request->position,
            'phone' => $request->phone,
            'role' => 'employee',
        ]);

        return back()->with('success', 'Employee added!');
    }

    public function update(Request $request, User $employee)
    {
        $employee->update([
            'name' => $request->name,
            'email' => $request->email,
            'department' => $request->department,
            'position' => $request->position,
            'phone' => $request->phone,
        ]);

        return back()->with('success', 'Employee updated!');
    }

    public function destroy(User $employee)
    {
        $employee->delete();
        return back()->with('success', 'Employee deleted!');
    }
}