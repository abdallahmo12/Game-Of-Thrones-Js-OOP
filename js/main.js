
// function Constructor
function Person ( name , power , health ){
    this.name = name;
    this.power = power;
    this.health = health;

    this.attackBtn = document.querySelector(`#${this.name}-attack`);
    this.healthBtn = document.querySelector(`#${this.name}-health`);
    this.progress = document.querySelector(`.${this.name}-points span`);
    this.chossenBtn = document.querySelector(`#${this.name}-chossen`);
    this.diedMessage = document.querySelector(`#${this.name}-alive`);
    this.statusBtn = document.querySelector(`#${this.name}-status-btn`);
    this.statusMessage = document.querySelector(`#${this.name}-status`);
}

let daenerys = new Person('daenerys' , 10 , 100);
let k_king = new Person('k-king' , 10 , 100);



Person.prototype.attack = function(competitor){

    if(competitor.health > 0){
        competitor.health -= this.power;
        competitor.progress.style.width = `${competitor.health}%`
    }
    else{
        competitor.chossenBtn.disabled = true;
        competitor.chossenBtn.style.backgroundColor = "#ededed";
        competitor.attackBtn.disabled = true;
        competitor.attackBtn.style.backgroundColor = "#ededed";
        competitor.healthBtn.disabled = true;
        competitor.healthBtn.style.backgroundColor = "#ededed";

        competitor.diedMessage.textContent = `${competitor.name} is died ( Game Over )`;
        competitor.diedMessage.style.display = "block";
        competitor.diedMessage.style.width = "50%";
        competitor.diedMessage.style.borderRadius = "6px";
        competitor.diedMessage.style.color = "white";

        competitor.diedMessage.style.backgroundColor = (this == daenerys) ?"red": "blue";
        this.diedMessage.style.display = "none";
        }
    
}

//function to display status ( Character Health )

Person.prototype.status = function(){
    return this.health;
}

daenerys.statusBtn.addEventListener('click', () =>{
    daenerys.statusMessage.innerText = `health is : ${daenerys.status()}`;
});

k_king.statusBtn.addEventListener('click', () =>{
    k_king.statusMessage.innerText = `health is : ${k_king.status()}`;
});

Person.prototype.makeHealth = function(){
    if(this.health < 100)
    {
        this.health += 10;
        if(this.health > 100)
        {
            this.health = 100;
        }
    }
    this.progress.style.width =`${this.health}%`
}

// fuction to choose playes to fight computer

Person.prototype.hasChossenVs = function(competitor){
    var competitor , player;
    this === daenerys ? competitor = Object.assign(k_king) : competitor = Object.assign(daenerys);

    player = Object.assign(this);

    alert(`You are ${this.name} and Computer is ${competitor.name}`);

    competitor.chossenBtn.disabled = true;
    competitor.chossenBtn.style.backgroundColor = "#ededed";
    this.chossenBtn.disabled = true;
    this.chossenBtn.style.backgroundColor = "#080";
    this.chossenBtn.textContent = "Choosen";

    const myInterval = setInterval(function(){
        if(competitor.status() == 0)
        {
        clearInterval(myInterval);
        }
        else{
            competitor.attack(player);
            competitor.makeHealth();
        }
    },1500);

    
    
    // function computerDo(){
    //     competitor.attack(player);
    //     competitor.makeHealth();
    // }
}

// Attack function Linked with attack button

daenerys.attackBtn.addEventListener('click',function() {
    daenerys.attack(k_king);
})

k_king.attackBtn.addEventListener('click',function() {
    k_king.attack(daenerys);
})

// Charater Choosen Linked with choose button

daenerys.chossenBtn.addEventListener('click', function(){
    daenerys.hasChossenVs(k_king);
})
k_king.chossenBtn.addEventListener('click', function(){
    k_king.hasChossenVs(daenerys);
})

// makeHealth Linked with progress Bar

daenerys.healthBtn.addEventListener('click',function(){
    daenerys.makeHealth();
});
k_king.healthBtn.addEventListener('click',function(){
    k_king.makeHealth();
});