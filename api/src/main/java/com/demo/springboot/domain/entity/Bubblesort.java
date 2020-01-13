package com.demo.springboot.domain.entity;


public class Bubblesort {
    private String bubblesortString;

    public Bubblesort(String bubblesortString) {
        this.bubblesortString = bubblesortString;
    }
    public String sort(){
        String result = "";
        String[] bubblesortArray = bubblesortString.split(";");
        Double[] numbersArray = new Double[bubblesortArray.length];
        for(int i=0; i<bubblesortArray.length; i++){
            try {
                numbersArray[i] = Double.parseDouble(bubblesortArray[i]);
            }catch(NumberFormatException e){
                return "nieprawidłowy format";
            }
        }
        for (int i = 0; i < numbersArray.length-1; i++) {
            for (int j = 0; j < numbersArray.length - i - 1; j++) {
                if (numbersArray[j] > numbersArray[j + 1]) {
                    // swap arr[j+1] and arr[i]
                    Double temp = numbersArray[j];
                    numbersArray[j] = numbersArray[j + 1];
                    numbersArray[j + 1] = temp;
                }
            }
        }
        for(int i=0; i<numbersArray.length; i++){
            if(i<numbersArray.length-1){result+=checkIfInteger(numbersArray[i])+";";}
            else{result+=checkIfInteger(numbersArray[i]);}
        }
        return result;
    }
    private String checkIfInteger(Double number){
        if(number%1!=0){
            return Double.toString(number);
        }else{
            //number = Double.toString(number)
            Integer numberAsInt = number.intValue();
            return Integer.toString(numberAsInt);
        }
    }
}
