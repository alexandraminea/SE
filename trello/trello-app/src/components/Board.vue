/* eslint-disable */
<template>
<div>
    <!-- <div>{{initEdit()}}</div> -->
  <!-- Navbar content -->
  <b-navbar toggleable="lg" type="dark" variant="info" class="navbar navbar-dark bg-dark">
    <b-navbar-brand href="#" :to="{ path: '/'}">Boards</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>

      <div class="logo">
      <h1><i class="fab fa-trello logo-icon" aria-hidden="true"></i>My Trello</h1>
      </div>

      <b-navbar-nav>
          <input type="text" v-model="name" placeholder="List name" class="form-control">
          <button title="Add list" class="btn btn-success" v-on:click="addListToBoard()">Add</button>
      </b-navbar-nav>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="container">
    <h1 class="my-3">{{getBoard().name}}</h1>
  </div>

  <table class="table text-left">
    <!-- big table -->
    <tbody>
      <tr v-for="(listt, idx) in getLists()" :key="idx" v-if="idx%4==0">
        <b-card-group deck>
          <td v-for="(list, idy) in getLists()" :key="idy" v-if="idy>=idx && idy < (idx+4)">
            <b-card 
            bg-variant="light"
            :header="list.name"
            class="text-center"
            style="max-width: 40rem;"
            tag="article">
            <b-list-group>
              <table class="table">
                <tr v-for="(card, idxx) in getCards(idy, list.id)" :key="idxx">
                  <!-- <td v-if="editMode == true && edittedCardId == card.id">
                    <b-form-input v-model="text[idy]" id="input-small" size="sm" placeholder="Add card text"></b-form-input>
                  </td>
                  <td class="text-right" v-if="editMode == true && edittedCardId == card.id">
                    <button title="Add Card" class="btn btn-success" v-on:click="saveAndExit(idy, list.id, card.id)">Save</button>
                  </td> -->
                  <td>
                    {{card.text[idy]}}
                  </td>

                  <td>
                    <!-- MODAL -->
                    <div>
                      <b-badge href="#" pill variant="dark"  @click="edittedCardId = card.id; sendInfo(idy, card.text[idy], card); $bvModal.show('bv-modal-example')">info</b-badge>
                      <!-- <b-button id="show-btn" @click="edittedCardId = card.id; sendInfo(idy, card.text[idy], card); $bvModal.show('bv-modal-example')">Show card</b-button> -->

                      <b-modal id="bv-modal-example" @show="resetModal" hide-footer>
                        <template #modal-header="{ close }">
      <!-- Emulate built in modal header close button action -->
                          <!-- <b-button size="sm" variant="outline-danger" v-on:click="editMode = false; $bvModal.hide('bv-modal-example')"> -->
                            <!-- Close Modal -->
                          <!-- </b-button> -->
                          <!-- <h5>{{cardName}}</h5> -->
                        </template>
                        <template #modal-title>
                          {{cardName}}
                        </template>
                        <div class="d-block text-left">
                          <table class="table">
                    <div class="card">
                    <div class="card-body">
                      {{currentCard.description}}
                    </div>
                    </div>
                    <tr>
                      <td v-if="editMode == true">
                      <b-form-input v-model="cname[idySent]" id="input-small" placeholder="Change card name"></b-form-input>
                      <b-form-input v-model="description" id="input-small" placeholder="Change card description"></b-form-input>
                      </td>
                      <td class="text-right" v-if="editMode == true">
                        <button title="Add Card" class="btn btn-success" v-on:click=" $bvModal.hide('bv-modal-example'); saveAndExit(idySent, list.id, currentCard.id)">Save</button>
                      </td>
                      <td class="text-right">
                        <div>
                        <b-dropdown id="dropdown-1" text="Action" class="m-md-2">
                          <b-dropdown-item @click="setEditMode(currentCard.id)">Edit</b-dropdown-item>
                          <b-dropdown-item @click="deleteCard(currentCard.id); $bvModal.hide('bv-modal-example')">Delete</b-dropdown-item>
                          <b-dropdown-divider></b-dropdown-divider>
                        </b-dropdown>
                        </div>
                      </td>
                    </tr>
                    </table>
                    </div>
                    <b-button class="mt-3" block variant="outline-danger" @click="$bvModal.hide('bv-modal-example'); editMode = false">Close Me</b-button>
                    </b-modal>
                    </div>
                  </td>
                </tr>
              </table>
              <b-list-group-item href="#">
                  <table class="table text-left">
                    <tr>
                      <td>
                        <b-form-input v-model="text[idy]" id="input-small" size="sm" placeholder="Add new Card name"></b-form-input>
                      </td>
                      <td class="text-right">
                        <button title="Add Card" class="btn btn-success" v-on:click="addCardToList(idy, list.id)">Add Card</button>
                      </td>
                    </tr>
                  </table>
              </b-list-group-item>
            </b-list-group>
            <button title="Delete board" class="btn btn-danger" v-on:click="deleteList(list.id)">Delete</button>
            </b-card>
            </td>
          </b-card-group>
        </tr>
      </tbody>
    </table>
  <router-view :key="$route.path"></router-view>
</div>
</template>

<script>
import { db } from '../main' // notice the firebase database connection import
import Board from '@/components/Board'
export default {
  components: {
    Board
  },
  name: 'HelloWorld',
  props: {
    idd: {
      type: Number,
      rquired: true
    },
    textt: {
      type: String,
      rquired: true
    }
  },
  data () { // here we provide the initial values for our data model: boards, name, lecturer
    return {
      boards: [], // list of board objects
      name: '', // board name form field
      lists: [],
      boardID: this.$route.params.id,
      id: '',
      text: {},
      description: '',
      db,
      currentList: null,
      boardDocID : this.$route.params.boardId,
      cards: [],
      editMode: false,
      editDescription: false,
      ed: {},
      edittedCardId: '',
      cardName: '',
      currentCard: {},
      idySent: '',
      cname: {}
    }
  },
  firestore () {
    let boards = db.collection('boards').orderBy('createdAt')
    console.log(boards)
    let boardDocID = this.$route.params.boardId
    let listID = this.$route.params.listId
    let cards = []
    let lists = []
    //let lists = db.collection('lists').where('boardID', '==', this.$route.params.boardId)
    lists = db.collection('lists').orderBy('createdAt')
    cards = db.collection('cards').orderBy('createdAt')
    console.log(lists)
    return {
      boards,
      lists,
      cards
    }
  },
  methods: {
    deleteboard (id) { // method that deletes a board from our Firebase collection by id
      db.collection('boards').doc(id).delete()
    },
    deleteList (id) { // method that deletes a board from our Firebase collection by id
      db.collection('lists').doc(id).delete()
    },
    deleteCard (id) { // method that deletes a board from our Firebase collection by id
      db.collection('cards').doc(id).delete()
    },
    addListToBoard (idy) {
      db.collection('lists').add({
        name: this.name,
        createdAt: new Date(),
        boardID: this.$route.params.boardId 
      }),
      this.name = ''
    },
    getBoard () { //
      for (const board of this.boards) {
        if (this.$route.params.boardId == board.id) {
          return board
        }
      }
    },
    // getId() {
    //   return this.getBoard().id;
    // },
    addCardToList (idy, listId) {
      console.log(idy)
      console.log(this.text)
      db.collection('cards').add({
        text: this.text,
        description: this.description,
        createdAt: new Date(),
        listID: listId
      })
      for (let i = 0; i <= idy; i++) {
        this.text[i] = ''
      }
      this.description = ''
    },

    getCards (idy, listid) {
      let card_list = []
      for(const card of this.cards) {
          //console.log(card.text[idy])
          if(card.listID == listid)
          card_list.push(card)
      }
      return card_list
    },

    getLists () {
      let lists_list = []
      for(const list of this.lists) {
          //console.log(card.text[idy])
          if(list.boardID == this.$route.params.boardId)
          lists_list.push(list)
      }
      return lists_list
    },
    setEditMode(cardId) {
      this.editMode = true
      this.ed[cardId] = true
      console.log(this.ed[cardId])
      console.log(cardId)
      this.edittedCardId = cardId
    },
    setEditDescription() {
      this.editDescription = true
    },
    saveAndExit (idy, listId, cardId) {
      // this.addCardToList(idy, listId)
      // this.deleteCard(cardId)
      db.collection("cards").doc(cardId).update({text: this.cname})
      db.collection("cards").doc(cardId).update({description: this.description})
      for (let i = 0; i <= idy; i++) {
        this.cname[i] = ''
      }
      this.editMode = false
      this.ed[cardId] = false
      this.edittedCardId = ''
      this.currentCard = {}
      console.log(this.description)
    },
    // initEdit() {
    //   for(const card of this.cards) {
    //     this.ed[card.id] = false
    //     console.log(card.id)
    //     console.log(this.ed[card.id])
    //   }
    // },
    getMode(cardId) {
      console.log(cardId)
      console.log(this.ed[cardId])
      return this.ed[cardId] === true
    },
    sendInfo(idy, cardName, card) {
        this.cardName = cardName
        this.currentCard = card
        this.idySent = idy
    },
    resetModal() {
        this.description = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    flex: 1;
    font-family: "Courgette", cursive;
    font-size: 1.1rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.5);
    margin: 0 2rem;
    transition: color 150ms;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
}
.to-do-list-item {
  position: relative;
  border: 1px solid #cecece;
  border-radius: 10px;
  width: 300px;
  height: 50px;
  margin: 10px auto;
  padding:10px;
  box-sizing: border-box;
  input[type=text] {
    width: 80%;
    border:none;
    text-align: center;
    border-bottom:1px solid black;
    font-weight: bold;
  }
  span {
    width: 80%;
    overflow: hidden;
    display:inline-block;
    cursor: default;
    font-weight: bold;
  }
  button {
    position: absolute;
    margin: 5px;
    bottom: 0;
    cursor: pointer;
    background: transparent;
    border: none;
    &.edit, &.save {
      left: 0;
    }
    &.remove {
      right: 0;
    }
  }
}
</style>
