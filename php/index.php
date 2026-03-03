<?php

error_reporting(E_ALL ^ E_ERROR);


// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$myVar = $someVar ?? 42;
$myVar = isset($someVar) ? $someVar : 42;


// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$array = array(
    '',
    // null,
    // '0',
    // 0,
    'egg' => true,
    'cheese' => false,
    'hair' => 765,
    'goblins' => null,
    'ogres' => 'no ogres allowed in this array'
);

var_dump(in_array('', $array)); // true
var_dump(in_array(null, $array)); // true
var_dump(in_array('0', $array)); // true
var_dump(in_array(0, $array), true); // true


in_array(null, $array); // true
in_array(false, $array); // true
in_array(765, $array); // true
in_array(763, $array); // true
in_array('egg', $array); // true
in_array('hhh', $array); // true
in_array(array(), $array); // true

// Strict checking

in_array(null, $array, true); // true
in_array(false, $array, true); // true
in_array(765, $array, true); // true
in_array(763, $array, true); // false
in_array('egg', $array, true); // false
in_array('hhh', $array, true); // false
in_array(array(), $array, true); // false

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


/*
Operator are used to perform operation.

Operator are mainly divided by three groups.
1.Uniary Operators that takes one values
2.Binary Operators that takes two values
3.ternary operators that takes three values

Operator are mainly divided by three groups that are totally seventeen types.
1.Arithmetic Operator
+ = Addition
- = Subtraction
* = Multiplication
/ = Division
% = Modulo
** = Exponentiation

2.Assignment Operator
     = "equal to

3.Array Operator
    + = Union
    == = Equality
    === = Identity
    != = Inequality
    <> = Inequality
    !== =    Non-identity

4.Bitwise Operator
& = and
^ = xor
| = not
<< = shift left
>> = shift right

5.Comparison Operator
==  = equal
=== = identical
!=  = not equal
!== = not identical
<>  = not equal
< = less than
<= less than or equal
> = greater than
>= = greater than or equal
<=> = spaceship operator

6.Execution Operator
 `` = backticks

7.Error Control Operator
    @ = at sign

8.Incrementing/Decrementing Operator
    ++$a = PreIncrement
    $a++ = PostIncrement
    --$a = PreDecrement
    $a-- = Postdecrement

9.Logical Operator
    && = And
    || = Or
    ! = Not
    and = And
    xor = Xor
    or = Or

10.string Operator
    . =  concatenation operator
    .= concatenating assignment operator

11.Type Operator
    instanceof = instanceof

12.Ternary or Conditional operator
   ?: = Ternary operator

13.Null Coalescing Operator
    ??" = null coalescing

14.Clone new Operator
    clone new = clone new

15.yield from Operator

    yield from = yield from

16.yield Operator
    yield = yield

17.print Operator
    print = print
*/

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


/**
 * Define MyClass
 */
class MyClass
{
    public $public = 'Public';
    protected $protected = 'Protected';
    private $private = 'Private';

    public function printHello()
    {
        echo $this->public . PHP_EOL;
        echo $this->protected . PHP_EOL;
        echo $this->private . PHP_EOL;
    }

    public function getPrivate()
    {
        return $this->private;
    }
}

$obj = new MyClass();
$obj->printHello(); // Shows Public, Protected and Private
echo 'GetPrivate: ' . $obj->getPrivate() . PHP_EOL;

echo @$obj->public; // Works
@print($obj->protected); // Fatal Error
echo $obj->private; // Fatal Error



/**
 * Define MyClass2
 */
class MyClass2 extends MyClass
{
    // We can redeclare the public and protected properties, but not private
    public $public = 'Public2';
    protected $protected = 'Protected2';

    function printHello()
    {
        echo $this->public;
        echo $this->protected;
        echo $this->private;
    }

    public function getProtected()
    {
        return $this->protected;
    }
}

$obj2 = new MyClass2();

echo $obj2->getProtected() . PHP_EOL;
echo $obj2->public; // Works
echo $obj2->protected; // Fatal Error
echo $obj2->private; // Undefined
$obj2->printHello(); // Shows Public2, Protected2, Undefined



