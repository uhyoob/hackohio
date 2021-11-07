import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Recipe } from '../components/recipe';

@customElement('app-recipepage')
export class AppRecipepage extends LitElement {
  static get styles() {
    return css`
        .border {
            height: 600px;
            width: 50%;
            border: 5px solid black;
            font-family: "Century Gothic";
            background-color: white;
            margin-left: 25%;
        }
        .borderside {
            height: 600px;
            width: 20%;
            font-family: "Century Gothic";
            border: none;
            background-color: #4d0000;
        }
        :host {
          display: block;
          background-color: black;
          font-family: "Century Gothic";
          color: white;
        }
        .textboxIngredient {
            width: 99%;
            font-family: "Century Gothic";
            height: 29%;
            margin: -1px;
        }
        .directions{
            width: 99%;
            font-family: "Century Gothic";
            height: 55%;
            color: black;
        }
        .middle{
            width: 99%;
            height: 3%;
            font-family: "Century Gothic";
            margin-left: 0%;
            text-align: center;
        }
        .newbutton {
            border: 2px solid black;
            background-color: #4d0000;
            color: white;
            font-family: "Century Gothic";
            text-align: center;
            font-size: 16px;
            cursor: pointer;
            position: absolute;
            bottom: 20px;
            right: 20px;
        }
        .savebutton {
            border: 2px solid black;
            background-color: #4d0000;
            color: white;
            text-align: center;
            font-family: "Century Gothic";
            font-size: 16px;
            cursor: pointer;
            position: absolute;
            bottom: 60px;
            right: 20px;
        }
        .loadbutton {
          border: 2px solid black;
          background-color: #4d0000;
          color: white;
          text-align: center;
          font-size: 16px;
          cursor: pointer;
          position: absolute;
          bottom: 100px;
          right: 20px;
          font-family: "Century Gothic";
        }
        .recipe {
            border: none;
            background-color: #4d0000;
            opacity: .4;
            font-size: 16px;
            cursor: pointer;
            font-family: "Century Gothic";

        }

    `;
  }

  //create new recipe
  currentRecipe: Recipe = new Recipe();

  constructor() {
    super();
  }

  onInputChangeTitle(evt: any) {
    this.currentRecipe.title = evt.target.value;
  }

  onInputChangeDirections(evt: any) {
    this.currentRecipe.directions = evt.target.value;
  }

  onInputChangeIngredients(evt: any) {
    this.currentRecipe.ingredients = evt.target.value;
  }
  /*
  DefaultTemplate =
    '<textarea name="Title" cols="50" rows="1" style="resize: none;" id="middle" @input=${this.onInputChangeTitle}>Title</textarea>' +
    '<textarea name="Ingredients" cols="100" rows="5" style="resize: none;" class="textboxIngredient" overflow:auto' +
    '@input=${this.onInputChangeIngredients}>Ingredients\n1.\n2.\n3.\n4.\n5.\n6.\n7.\n8.\n9.\n10.\n11.\n12.</textarea>' +
    '<textarea name="Directions" cols="100" rows="10" style="resize: none;" class="directions" overflow:auto @input=${this.onInputChangeDirections}>Directions</textarea>';
  */

  myFunction() {
    let sr: ShadowRoot | null = this.shadowRoot;

      if (sr) {
          let loadText = ((sr) as ShadowRoot).getElementById("loadText");

          if (loadText) {
              //loadText.innerHTML = this.DefaultTemplate;
          }
      }

  }



  //Create Recipe buttons
  recipename: string = '';

  printbuttons() {
    let arrayRecipes: Recipe[] = Recipe.getAllRecipes();

      let sr: ShadowRoot | null = this.shadowRoot;
      if (sr) {
        let loadText: HTMLElement = ((sr) as ShadowRoot).getElementById("loadTextRecipeButtons") as HTMLElement;

        loadText.innerHTML = "Result";
        for (let loadedRecipe of arrayRecipes) {
          this.recipename = loadedRecipe.title;
          let Defaultbuttons: HTMLButtonElement = document.createElement("button");
          Defaultbuttons.setAttribute("class", "recipe");
          Defaultbuttons.innerText = this.recipename;
          Defaultbuttons.addEventListener("click", this.buttons);

          if (loadText) {
            loadText.innerHTML += '<br>';
            loadText.appendChild(Defaultbuttons);
          }

        }
      }
  }

  ActiveTitle: string = "";
  ActiveIngredients: string = "";
  ActiveDescriptions: string = "";

  buttons(evt: any) {

    console.log("hlep");

    let sr: ShadowRoot | null = this.shadowRoot;
    if (sr) {
      let activeTitleElement: HTMLElement = ((sr) as ShadowRoot).getElementById("activeTitle") as HTMLElement;
      let activeIngredientsElement: HTMLElement = ((sr) as ShadowRoot).getElementById("activeIngredients") as HTMLElement;
      let activeDescriptionsElement: HTMLElement = ((sr) as ShadowRoot).getElementById("activeDescriptions") as HTMLElement;

      let title: string = evt.target.value;
      let newRecipeUnchecked: Recipe | null = Recipe.loadFromStorage(title)
      if (newRecipeUnchecked) {
        let newRecipe: Recipe = newRecipeUnchecked as Recipe;
          activeTitleElement.textContent = newRecipe.title;
          activeIngredientsElement.textContent = newRecipe.ingredients;
          activeDescriptionsElement.textContent = newRecipe.directions;
      }
    }
  }



  /* <div class="border">
        <textarea name="Title" cols="50" rows="1" style="resize: none;" id="middle"></textarea>
        <textarea name="Ingredients" cols="100" rows="5" style="resize: none;" class="textboxIngredient"
        overflow:auto></textarea>
        <textarea name="Directions" cols="100" rows="10" style="resize: none;" class="directions"></textarea>
    </div>
  */


  render() {
    return html`
      <app-header enableBack="${true}"></app-header>
      <div>
        <div id="loadTextRecipeButtons" style="width: 15%; float:left; height:600px; background-color: #4d0000; border: none; margin:10px">
            <center>Result</center>

        </div>
        <div style="width: 50%; color: black; float:left; height:600px; background-color: white; border: 5px solid black; margin: 10px 170px">
            <center>Title</center>
            <textarea name="Title" id="activeTitle" cols="50" rows="1" style="resize: none; color: black;" class="middle"></textarea>
            <br>Ingredients
            <textarea name="Ingredients" id="activeIngredients" cols="100" rows="5" style="resize: none; color: black;" class="textboxIngredient"
            overflow:auto></textarea>
            Directions
            <textarea name="Directions" id="activeDirections" cols="100" rows="10" style="resize: none;" class="directions" overflow:auto></textarea>
        </div>

        <div>
            <button class="newbutton" @click=${this.myFunction}>Add Recipe</button>
            <button class="savebutton" @click=${this.currentRecipe.saveToStorage}>Save Recipe</button>
            <button class="loadbutton" @click=${this.printbuttons}>Load</button>
        </div>

      </div>
    `;
  }
}

