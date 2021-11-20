<template>

  <div>
  <!-- Navbar content -->
  <b-navbar toggleable="lg" type="dark" variant="info" class="navbar navbar-dark bg-dark">

    <b-navbar-brand href="#">Boards</b-navbar-brand>

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
            <input type="text" v-model="name" placeholder="Board name" class="form-control">
            <button title="Add board" class="btn btn-success" v-on:click="addboard()">Add</button>
        </b-navbar-nav>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <!-- Old part -> table -->
    <table class="table text-left">
      <tbody>
        <div v-for="(boardd, idx) in boards" :key="idx" v-if="idx%4==0">
            <tr>
              <td v-for="(board, idy) in boards" :key="idy" v-if="idy>=idx && idy < (idx+4)">
              <b-card
                bg-variant="light"
                :header="board.name"
                class="text-center"
                style="max-width: 20rem;"
                img-src="https://upload.wikimedia.org/wikipedia/commons/5/5d/GNOME_Todo_icon_2019.svg"
                img-alt="Image"
                img-height="290"
                img-width="100"
                img-top
                tag="article"
                >
                <b-button href="#" variant="primary" :to="{ path: '/board/'+idy+'/'+board.id}">
                  Open
                </b-button>
                <button title="Delete board" class="btn btn-danger" v-on:click="deleteboard(board.id)">Delete</button>
              </b-card>
            </td>
            </tr>
        </div>
      </tbody>
    </table>
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
  data () { // here we provide the initial values for our data model: boards, name, lecturer
    return {
      boards: [], // list of board objects
      name: '', // board name form field
      slide: 0,
      sliding: null,
      table: [],
      id: '0'
    }
  },
  firestore () { // this method will get called automatically by VueFire in order to update the boards property of our data model
    return {
      boards: db.collection('boards').orderBy('createdAt')
    }
  },
  methods: {
    addboard () { // method to add a new board to our Firebase collection
      db.collection('boards').add({
        name: this.name,
        createdAt: new Date()
      })
      this.name = ''
    },
    deleteboard (id) { // method that deletes a board from our Firebase collection by id
      db.collection('boards').doc(id).delete()
    },
    addListToBoard(boardId){
      db.collection('boards').doc(boardId).collection('Lists').add({
        name: this.name,
        createdAt: new Date()
      })
      this.name = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row {
    border: 1px solid red;
  }
  .col {
    border: 1px solid blue;
  }
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
.boards-btn {
    flex-basis: 9rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    margin-right: 0.8rem;
    padding: 0.6rem 0.8rem;
}

.boards-btn-icon {
    font-size: 1.7rem;
    padding-right: 1.2rem;
  
}

.icon-btn {
    padding: 1px 15px 3px 2px;
    border-radius:50px;
}

.carousel {
  width:640px;
  height:360px;
}

</style>
