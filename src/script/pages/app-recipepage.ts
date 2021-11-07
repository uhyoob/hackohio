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
            background-color: white;
            margin-left: 25%;
        }
        .borderside {
            height: 600px;
            width: 20%;
            border: none;
            background-color: pink;
        }
        .textboxIngredient {
            width: 99%;
            height: 29%;
            margin: -1px;
        }
        .directions{
            width: 99%;
            height: 55%;
        }
        .middle{
            width: 99%;
            height: 3%;
            margin-left: 0%;
            text-align: center;
        }
        .newbutton {
            border: 2px solid black;
            background-color: #93E8FB;
            color: white;
            text-align: center;
            font-size: 16px;
            cursor: pointer;
            position: absolute;
            bottom: 20px;
            right: 20px;
        }
        .savebutton {
            border: 2px solid black;
            background-color: #93E8FB;
            color: white;
            text-align: center;
            font-size: 16px;
            cursor: pointer;
            position: absolute;
            bottom: 60px;
            right: 20px;
        }
        .loadbutton {
          border: 2px solid black;
          background-color: #93E8FB;
          color: white;
          text-align: center;
          font-size: 16px;
          cursor: pointer;
          position: absolute;
          bottom: 100px;
          right: 20px;
        }
        .recipe {
            border: none;
            background-color: #ffffff;
            opacity: .4;
            font-size: 16px;
            cursor: pointer;

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
        for (let i = 0; i < arrayRecipes.length && i < 5; i++) {
          let button: HTMLElement = ((sr) as ShadowRoot).getElementById("button" + (i + 1)) as HTMLElement;
          button.innerHTML = arrayRecipes[i].title;
        }
      }
  }

  activeTitle: string = "";
  activeIngredients: string = "";
  activeDescriptions: string = "";

  buttons(evt: any) {
    let title: string = evt.target.innerHTML;
    console.log(title);
    let newRecipeUnchecked: Recipe | null = Recipe.loadFromStorage(title)
    console.log(newRecipeUnchecked);
    if (newRecipeUnchecked) {
      let newRecipe: Recipe = newRecipeUnchecked as Recipe;
      this.activeTitle = newRecipe.title;
      this.activeIngredients = newRecipe.ingredients;
      this.activeDescriptions = newRecipe.directions;
    }

  }

  updateRecipe() {

    let sr: ShadowRoot | null = this.shadowRoot;

    if (sr) {

      let activeTitleElement: HTMLElement = ((sr) as ShadowRoot).getElementById("activeTitle") as HTMLElement;
      let activeIngredientsElement: HTMLElement = ((sr) as ShadowRoot).getElementById("activeIngredients") as HTMLElement;
      let activeDescriptionsElement: HTMLElement = ((sr) as ShadowRoot).getElementById("activeDirections") as HTMLElement;

      activeTitleElement.textContent = this.activeTitle;
      activeIngredientsElement.textContent = this.activeIngredients;
      activeDescriptionsElement.textContent = this.activeDescriptions;
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
        <div id="loadTextRecipeButtons" style="width: 15%; float:left; height:600px; background-color: pink; border: none; margin:10px">
            Result
            <br>
            <button class="recipe" @click=${this.buttons} id="button1">Recipe 1</button><br>
            <button class="recipe" @click=${this.buttons} id="button2">Recipe 2</button><br>
            <button class="recipe" @click=${this.buttons} id="button3">Recipe 3</button><br>
            <button class="recipe" @click=${this.buttons} id="button4">Recipe 4</button><br>
            <button class="recipe" @click=${this.buttons} id="button5">Recipe 5</button><br>

        </div>
        <div style="width: 50%; float:left; height:600px; background-color: white; border: 5px solid black; margin: 10px 170px">
            <center>Title</center>
            <textarea name="Title" id="activeTitle" cols="50" rows="1" style="resize: none;" class="middle"></textarea>
            <br>Ingredients
            <textarea name="Ingredients" id="activeIngredients" cols="100" rows="5" style="resize: none;" class="textboxIngredient"
            overflow:auto></textarea>
            Directions
            <textarea name="Directions" id="activeDirections" cols="100" rows="10" style="resize: none;" class="directions" overflow:auto></textarea>
        </div>

        <div>
            <button class="newbutton" @click=${this.updateRecipe}>Update</button>
            <button class="savebutton" @click=${this.currentRecipe.saveToStorage}>Save Recipe</button>
            <button class="loadbutton" @click=${this.printbuttons}>Load</button>
        </div>

      </div>
    `;
  }
}

