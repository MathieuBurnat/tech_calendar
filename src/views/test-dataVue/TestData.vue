<template>
    <div>
        <h1>tasks</h1>
        <table id="tasks" class="ui celled compact table">
            <thead>
            <tr>
                <th>  <i class="calendar plus icon"></i>Task</th>
                <th> <i class="info circle icon"></i>Detail</th>
                <th> <i class="lock open icon"></i></th>
                <th> <i class="edit icon"></i></th>
                <th> <i class="trash icon"></i></th>



                <th colspan="3"></th>
            </tr>
            </thead>

            <tr v-for="(Calendar, i) in Calendars" :key="i">
                <td>{{ Calendar.name }}</td>
                <td>{{ Calendar.author }}</td>
                <td width="75" class="center aligned">
                    <router-link :to="{ name: 'show', params: { id: Calendar._id }}">Show</router-link>
                </td>
                <td width="75" class="center aligned">
                    <router-link :to="{ name: 'edit', params: { id: Calendar._id }}">Edit</router-link>
                </td>
                <td width="75" class="center aligned" @click.prevent="onDestroy(Calendar._id)">
                    <a :href="`/tasks/${Calendar._id}`">Delete</a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { api } from "/helpers/helpers.vue";
    export default {
        name: 'Calendars',
        data() {
            return {
                Calendars: []
            };
        },
        methods: {
            async onDestroy(id) {
                const sure = window.confirm('Are you sure?');
                if (!sure) return;
                await api.deletetest(id);
                this.flash('Calendar deleted sucessfully!', 'success');
                const newTests = this.Calendars.filter(Calendar => Calendar._id !== id);
                this.Calendars = newTests;
            }
        },
        async mounted() {
            this.Calendars = await api.gettests();
        }
    };
</script>