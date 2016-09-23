import React from 'react';

var UserEdit = React.createClass({
	render: function() {
		return (
			<div className="container" style={{ "width": "1000px" }}>
		        <div className="row">
		        	<div className="col-md-3 text-center center-block">
		        			<img src="https://randomuser.me/api/portraits/men/85.jpg" className="img-circle text-center center-block photo__img" />
		        			  <div className="form-group">
							    <label htmlFor="upload-photo">Change Photo</label>
							    <input type="file" id="upload-photo" style={{ "display": "inline", "width": "100%" }}/>
							  </div>
		        	</div>
		        	<div className="col-md-9 profile">
						<h2>{ this.props.routeParams.login }</h2>
						<div className="row">
							<div className="col-md-10">
								<h3>General</h3>
							</div>	
						</div>
						<div className="row">
							<div className="col-md-5">
								<div className="form-group">
									<label htmlFor="fullname">Full Name</label>
									<input type="text" className="form-control" id="fullname" placeholder="Jack Shephard"/>
								</div>	
							</div>
							<div className="col-md-5">
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input type="email" className="form-control" id="email" placeholder="dr.shepard@gmail.com"/>
								</div>	
							</div>
						</div>
						<div className="row">
							<div className="col-md-5">
								<div className="form-group">
									<label htmlFor="phone-number">Phone Number</label>
									<input type="text" className="form-control" id="phone-number" placeholder="+4 815 16 23 42"/>
								</div>	
							</div>
							<div className="col-md-5">
								<div className="form-group">
									<label htmlFor="skype">Skype</label>
									<input type="text" className="form-control" id="skype" placeholder="jackshephard"/>
								</div>	
							</div>
						</div>
						<div className="row">
							<div className="col-md-5">
								<div className="form-group">
									<label htmlFor="workhours">Work Hours</label>
									<input type="text" className="form-control" id="workhours" placeholder="07:00 - 17:00"/>
								</div>	
							</div>
						</div>
						<div className="row">
							<div className="col-md-10">
								<h3>Personal</h3>
							</div>
						</div>	
						<div className="row">
							<div className="col-md-5">
								<div className="form-group">
									<label htmlFor="birthday">Birthday</label>
									<input type="text" className="form-control" id="birthday" placeholder="01.11.1990"/>
								</div>	
							</div>
							<div className="col-md-5">
								<div className="form-group">
									<label htmlFor="vk">VK</label>
									<input type="text" className="form-control" id="vk" placeholder="vk.com/jackshephard"/>
								</div>	
							</div>
						</div>
						<div className="row">
							<div className="col-md-5">
								<div className="form-group">
									<label htmlFor="twitter">Twitter</label>
									<input type="text" className="form-control" id="twitter" placeholder="@jackshephard"/>
								</div>	
							</div>
						</div>
						<div className="row">
							<div className="col-md-5">
	
							</div>
						</div>
						<div className="row">
							<div className="col-md-10">
								<h3>About me</h3>
								<textarea className="form-control" rows="5"></textarea>
							</div>
						</div>	
						<div className="row">
							<div className="col-md-10">
								<button type="button" className="btn btn-lg btn-success" style={{ "margin": "20px 0", "float": "right" }}>Save</button>
							</div>
						</div>	
					</div>
		        </div>
			</div>
		)
	}
})

export default UserEdit