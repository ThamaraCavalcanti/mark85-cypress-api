describe('POST /tasks', () => {

    beforeEach(function () {
        cy.fixture('tasks').then(function (tasks) {
            this.tasks = tasks
        })
    })


    it('register a new task', function () {
        const { user, tasks } = this.tasks.create

        cy.task('deleteUser', user.email)
        cy.postUser(user)

        cy.postSession(user)
            .then(response => {
                cy.task('deleteTask', tasks.name, user.email)

                cy.postTask(tasks, response.body.token)
                    .then(response => {
                        expect(response.status).to.eq(200)
                    })
            })
        })
})

//delete
//usar _id = id da tarefa
//url http://localhost:3333/tasks/_id no command