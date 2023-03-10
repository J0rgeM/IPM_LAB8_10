const user = {
	namespaced: true,
	state: {
		user: {
			// id: '',
			// name: '',
			// email: '',
			// session_id: '',
		},
		tmp_user:{},
	},
	getters: {
		getUser (state) {
			return state.user;
		},
	},
	mutations: {
		loginUser(state, user){
			state.user = user
		},
		logoutUser(state){
			state.user = {}
		},
		tmpUser(state, user){
			state.tmp_user = user
		},
	},
	actions: {
		async userExists({commit}, user) {
			try {

				const response = await fetch(`http://daw.deei.fct.ualg.pt/~a72480/LAB8_10/api/users.php?email=${user.email}`, {

					method: 'GET',
				})
				const data = await response.json()
				if ( data !== null) {
					alert('Email already exists')
					return true
				}
				else {
					//remember temporary user
					commit('tmpUser', user)
					return false
				}
			}
			catch (error) {
				console.error(error)
				alert('Error: Database connection failed in phase 1')
				return false
			}
		},
		async addUser({state}) {
			try {
				const response = await fetch('http://daw.deei.fct.ualg.pt/~a72480/LAB8_10/api/users.php', {


					method: 'POST',
					body: JSON.stringify(state.tmp_user),
					headers: { 'Content-type': 'text/html; charset=UTF-8' },
				})
				const data = await response.json()
				console.log('received data:', data)
				return true
			}
			catch (error) {
				console.error(error)
				alert('Error: Database connection failed in phase 2')
				return false
			}
		},
		async loginUser({commit}, user) {
			try {

				const response = await fetch(`http://daw.deei.fct.ualg.pt/~a72480/LAB8_10/api/users.php?email=${user.email}&password=${user.password}`)

				const data = await response.json()
				if ( data == null) {
					return false
				}
				else {
					//add new user
					commit('loginUser', data)
					return true
				}

			}
			catch (error) {
				console.error(error)
				alert('Error: Database connection failed')
				return false
			}
		},
		async logoutUser({commit},session_id) {
			try {
				const response = await fetch(`http://daw.deei.fct.ualg.pt/~a72480/LAB8_10/api/users.php?session_id=${session_id}`)
				const data = await response.json()
				console.log('received data:',data)
				commit('logoutUser')
				return true
			}
			catch (error) {
				console.error(error)
				return false
			}
		},
	}

}
export default user