import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../services/actions/questions'
import { withRouter } from 'react-router-dom'

class Add extends Component {
	state = {
		optionOneText: '',
		optionTwoText: '',
		error: '',
	}

	handleChange = (e) => {
		const name = e.target.name
		const value = e.target.value

		this.setState(() => ({
			[name]: value,
			error: '',
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { optionOneText, optionTwoText } = this.state
		const { dispatch } = this.props

		if (!optionOneText || !optionTwoText) {
			this.setState({
				error: 'You must provide both options.',
			})
			return;
		}

		dispatch(handleAddQuestion(optionOneText, optionTwoText))

		this.props.history.push('/')

		this.setState(() => ({
			optionOneText: '',
			optionTwoText: '',
			error: '',
		}))
	}

	render() {
		const { error } = this.state
		return (
			<div className="container d-flex justify-content-center">
				<div className="col-12 col-md-8 col-lg-6">
					<div className="card">
						<div className="card-header bg-dark text-white"><strong>New Poll</strong></div>
						<div className="card-body bg-light">
							{error && <div className="alert alert-danger">{error}</div>}
							<form>
								<div className="form-group">
									<label htmlFor="optionOneText">Option One</label>
									<input type="text" className="form-control" id="optionOneText" name="optionOneText" aria-describedby="optionOneTextHelp" value={this.state.optionOneText} onChange={this.handleChange} autoFocus />
								</div>
								<div className="form-group">
									<label htmlFor="OptionTwoText">Option Two</label>
									<input type="text" className="form-control" id="optionTwoText" name="optionTwoText" aria-describedby="optionTwoTextHelp" value={this.state.optionTwoText} onChange={this.handleChange} />
								</div>
								<div className='add-btn'>
									<button type="submit" className="btn btn-dark w-100 border-0" onClick={this.handleSubmit} disabled={error}>Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ questions, authedUser }) {
	return {
		questions,
		authedUser
	}
}

export default withRouter(connect(mapStateToProps)(Add))
