package com.example.EmpMngmt.controller;

import com.example.EmpMngmt.dto.Employee;
import com.example.EmpMngmt.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/addEmployee")
    public Employee addEmployee(@RequestBody Employee employee){
        return employeeService.addEmployee(employee);
    }

    @GetMapping("/getEmployee/{empId}")
    public ResponseEntity<Employee> getEmployee(@PathVariable int empId){
        Optional<Employee> optionalEmployee = employeeService.getEmployee(empId);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            return ResponseEntity.ok(employee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteEmployee/{empId}")
    public void deleteEmployee(@PathVariable int empId) {
        employeeService.deleteEmployee(empId);
    }

    @PutMapping("/updateEmployee/{empId}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable int empId,
            @RequestBody Employee updatedEmployee
    ) {
        Optional<Employee> optionalEmployee = employeeService.getEmployee(empId);
        if (optionalEmployee != null) {
            Employee employee = optionalEmployee.get();
            employee.setEmpName(updatedEmployee.getEmpName());
            return ResponseEntity.ok(employee);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
}
