import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost, updatePost } from '../actions';
import queryString from 'querystring';

class PostsNew extends Component {
     id;

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>

            </div>

        );
    }

    renderTextArea(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                
                <label>{field.label}</label>
                <textarea
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>

            </div>

        );
    }


    onSubmit(values) {
        console.log(queryString.parse(this.props.location.search.replace("?","")).id);
        if (this.id!=undefined){
            values.id=this.id;
            this.props.updatePost(values,()=>{
                this.props.history.push('/');
            });
        }
        else
        {
            this.props.createPost(values,()=>{
                this.props.history.push('/');
            });
        }
        //console.log(values);
       
    }

    componentDidMount(){
        console.log(this.props.location.search);
        const values = queryString.parse(this.props.location.search.replace("?",""));
        this.id=values.id;
        console.log(values.id);
    }


    render() {
        
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
           <input
                    className="form-control"
                    type="text"
                    name="id"
                    value= {this.id}
                    readOnly
               />
        
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderTextArea}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}


function validate(values) {
    const errors = {};

    /*if (!values.title || values.title.length < 3){
        errors.title="Title must be at least 3 characters!";
    }*/

    if (!values.title) {
        errors.title = "Enter a title!";
    }

    if (!values.categories) {
        errors.categories = "Enter some categories!";
    }

    if (!values.content) {
        errors.content = "Enter some content please!";
    }

    return errors;
}


export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost, updatePost })(PostsNew)
);