
public class Main {
    public static void main(String[] args) {
//        MethodOverloading or compile-time polymorphism
        System.out.println(MethodOverloading.add(3,4));
        System.out.println(MethodOverloading.add(5, 6,2));

//        MethodOverriding or run-time polymorphism
        Child child = new Child();
        child.print();
    }
}