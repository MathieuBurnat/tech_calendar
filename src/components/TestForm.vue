<template>
    <form action="#" @submit.prevent="onSubmit">
        <p v-if="errorsPresent" class="error">Please fill out both fields!</p>


        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="calendar plus icon"></i>task
            </div>
            <input type="text" placeholder="Enter task..." v-model="Calendars.name" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="info circle icon"></i> Details
            </div>
            <input type="text" placeholder="Enter Details" v-model="Calendars.author" />
        </div>



        <button class="positive ui button">Submit</button>
    </form>
</template>

<script>
    export default {
        name: 'task-form',
        props: {
            task: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        name: '',
                        author: ''
                    };
                }
            }
        },
        data() {
            return {
                errorsPresent: false
            };
        },
        methods: {
            onSubmit: function() {
                if (this.Calendars.name === '' || this.Calendars.author === '') {
                    this.errorsPresent = true;
                } else {
                    this.$emit('createOrUpdate', this.Calendars);
                }
            }
        }
    };
</script>

<style scoped>
    .error {
        color: red;
    }
</style>