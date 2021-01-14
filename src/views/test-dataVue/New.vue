<template>
    <div>
        <h1>New test</h1>
        <task-form @createOrUpdate="createOrUpdate"></task-form>
    </div>
</template>

<script>
    import testForm from "@/components/TestForm.vue";
    import { api } from "/helpers/helpers.vue";
    export default {
        name: 'new-task',
        components: {
            'task-form': testForm
        },
        methods: {
            createOrUpdate: async function(Calendar) {
                const res = await api.createtest(Calendar);
                this.flash('calendar created', 'success');
                this.$router.push(`/tasks/${res._id}`);
            }
        }
    };
</script>