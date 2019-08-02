const create = (user) => {
  return fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

const list = () => {
  return fetch('/api/users/', {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

const read = (params, credentials) => {
  return fetch('/api/users/' + params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const update = (params, credentials, user) => {
  return fetch('/api/users/' + params.userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: user
  }).then((response) => {
    console.log(response)
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const remove = (params, credentials) => {
  return fetch('/api/users/' + params.userId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const follow = (params, credentials, followId) => {
  return fetch('/api/users/follow/', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify({userId:params.userId, followId: followId})
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const unfollow = (params, credentials, unfollowId) => {
  return fetch('/api/users/unfollow/', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify({userId:params.userId, unfollowId: unfollowId})
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const findPeople = (params, credentials) => {
  return fetch('/api/users/findpeople/' + params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

/** Banner Image Update */
const updatebanner = (params, credentials, user) => {
  return fetch('/api/users/' + params.userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: user
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}
const countpeople =  (params, credentials) => {
  return fetch('/api/users/countfollowing/' + params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}
/** User link Activation */
const activatelink = (params,code) => {
  
  return fetch('/api/users/activation/'+params.token, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
    },
    body: params.token
  }).then((response) => {
   return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

/** End Here */

const notification = (params, credentials, userprivacy) => {
  return fetch('/api/users/notification1/'+params.userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: userprivacy
  }).then((response) => {
   return response.json()
  }).catch((err) => {
    console.log(err)
  })
}


const privacy = (params, credentials, userprivacy) => {
  return fetch('/api/users/privacy/'+params.userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: userprivacy
  }).then((response) => {

    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const payment = (params, credentials, paymentdetails) => {
  return fetch('/api/users/payment/'+params.userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: paymentdetails
  }).then((response) => {

    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}
/** End Here */


//  Shop module API for Product Add , update ,delete , list
const AddProduct = (shop) => {
  return fetch('/api/shop/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(shop)
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
    
}
const ProductList = () =>{
    return fetch('/api/shop/', {
      method: 'GET',
    }).then(response => {
      return response.json()
    }).catch((err) => console.log(err)) 
}
const findproduct = (params, credentials) => {
  return fetch('/api/shop/findproduct/' + params.productId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    console.log()
    return response.json()
  }).catch((err) => console.log(err))
}

const ProductRemove = (params, credentials) => {
  return fetch('/api/shop/' + params.productId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}
const ProductUpdate = (params,credentials,shop) => {
  return fetch('/api/shop/'+ params.productId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body:shop
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}
const ProductById = (params, credentials) => {
  console.log(params.productId)
  return fetch('/api/shop/' + params.productId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}
export {
  create,
  list,
  read,
  update,
  remove,
  follow,
  unfollow,
  findPeople,
  updatebanner,
  AddProduct,
  ProductList,
  findproduct,
  ProductRemove,
  ProductUpdate,
  ProductById,
  notification,
  privacy,
  payment,
  countpeople,
  activatelink
}
