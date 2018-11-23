import chai from 'chai'
import {
  signUpSchema,
  loginSchema,
  createParcelsSchema,
  destinationSchema,
  currentLocationSchema,
  changeStatusSchema
} from '../helpers/validator'

let should = chai.should();
let expect = chai.expect;

describe ('Validator', () => {

  describe('validate signup function', () => {
    let signupData = {
      firstname: "Ada",
      lastname: "Ugochi",
      email: "uta@g.ch",
      username: "user",
      password: "pass"
    }
  
    describe('when the sign up data meet require specifications', () => {
      it('returns false', (done) => {
        const fieldErrorFound = signUpSchema(signupData)
        expect(fieldErrorFound).to.not.be.equal(true)
        done()
      })
    })


    describe(' when the signup data does not meet require specifications', () => {
      it('returns a nice error message', (done) => {
        const invalidFirstNameData = {...signupData, firstname: ' '}
        const invalidLastNameData = {...signupData, lastname: ' '}
        const invalidEmailData = {...signupData, email: 'd@e'}
        const invalidPasswordData = {...signupData, password: ' '}

        expect(signUpSchema(invalidFirstNameData)).to.be.equal('firstname is invalid')
        expect(signUpSchema(invalidLastNameData)).to.be.equal('lastname is invalid')
        expect(signUpSchema(invalidEmailData)).to.be.equal('email is invalid')
        expect(signUpSchema(invalidPasswordData)).to.be.equal('password is invalid')
        done()
      })
    })

  })

  describe('validate login function', () => {
    let loginData = {
      email: "uta@g.ch",
      password: "pass"
    }
  
    describe('when the login data meet require specifications', () => {
      it('returns false', (done) => {
        const fieldErrorFound = loginSchema(loginData)
        expect(fieldErrorFound).to.not.be.equal(true)
        done()
      })
    })


    describe(' when the login data does not meet require specifications', () => {
      it('returns a nice error message', (done) => {
        const invalidEmailData = {...loginData, email: 'd@e'}
        const invalidPasswordData = {...loginData, password: ' '}

        expect(loginSchema(invalidEmailData)).to.be.equal('email is invalid')
        expect(loginSchema(invalidPasswordData)).to.be.equal('password is invalid')
        done()
      })
    })

  })

  describe('validate create parcel function', () => {
    const parcelData = {
      placedBy: 2,
      weight: 321,
      fromAddress: 'lagos',
      toAddress: 'onitsha',
      currentLocation: 'benin'
    }
  
    describe('when the create parcels data meet require specifications', () => {
      it('returns false', (done) => {
        const fieldErrorFound = createParcelsSchema(parcelData)
        expect(fieldErrorFound).to.not.be.equal(true)
        done()
      })
    })


    describe(' when the create parcels data does not meet require specifications', () => {
      it('returns a nice error message', (done) => {
        const invalidPlacedByData = {...parcelData, placedBy: null}
        const invalidWeightData = {...parcelData, weight: ' '}
        const invalidFromAddressData = {...parcelData, fromAddress: ' '}
        const invalidtoAddressData = {...parcelData, toAddress: ' '}
        const invalidLocationData = {...parcelData, currentLocation: ' '}

        expect(createParcelsSchema(invalidPlacedByData)).to.be.equal('placedBy is invalid')
        expect(createParcelsSchema(invalidWeightData)).to.be.equal('weight is invalid')
        expect(createParcelsSchema(invalidFromAddressData)).to.be.equal('fromAddress is invalid')
        expect(createParcelsSchema(invalidtoAddressData)).to.be.equal('toAddress is invalid')
        expect(createParcelsSchema(invalidLocationData)).to.be.equal('currentLocation is invalid')
        done()
      })
    })
  })

  describe('validate change destination function', () => {
    let destinationData = {
      toAddress: 'onitsha',
    }
  
    describe('when the destination field meet require specifications', () => {
      it('returns false', (done) => {
        const fieldErrorFound = destinationSchema(destinationData)
        expect(fieldErrorFound).to.not.be.equal(true)
        done()
      })
    })

    describe(' when the destination field does not meet require specifications', () => {
      it('returns a nice error message', (done) => {
        const invalidtoAddressData = {...destinationData, toAddress: ' '}

        expect(destinationSchema(invalidtoAddressData)).to.be.equal('toAddress is invalid')
        done()
      })
    })
  })

  describe('validate current location function', () => {
    let locationData = {
      currentLocation: 'onitsha',
    }
  
    describe('when the current location fields meet require specifications', () => {
      it('returns false', (done) => {
        const fieldErrorFound = currentLocationSchema(locationData)
        expect(fieldErrorFound).to.not.be.equal(true)
        done()
      })
    })

    describe(' when the current location field does not meet require specifications', () => {
      it('returns a nice error message', (done) => {
        const invalidcurrentLocationData = {...locationData, currentLocation: ' '}

        expect(currentLocationSchema(invalidcurrentLocationData)).to.be.equal('currentLocation is invalid')
        done()
      })
    })
  })

  describe('validate change destination function', () => {
    let destinationData = {
      toAddress: 'onitsha',
    }
  
    describe('when the toAddress fields meet require specifications', () => {
      it('returns false', (done) => {
        const fieldErrorFound = destinationSchema(destinationData)
        expect(fieldErrorFound).to.not.be.equal(true)
        done()
      })
    })

    describe(' when the toAddress field does not meet require specifications', () => {
      it('returns a nice error message', (done) => {
        const invalidtoAddressData = {...destinationData, toAddress: ' '}

        expect(destinationSchema(invalidtoAddressData)).to.be.equal('toAddress is invalid')
        done()
      })
    })
  })

  describe('validate change status function', () => {
    let statusData = {
      status: 'delivered',
    }
  
    describe('when the status field meet require specifications', () => {
      it('returns false', (done) => {
        const fieldErrorFound = changeStatusSchema(statusData)
        expect(fieldErrorFound).to.not.be.equal(true)
        done()
      })
    })

    describe(' when the status field does not meet require specifications', () => {
      it('returns a nice error message', (done) => {
        const invalidStatusData = {...statusData, status: null}

        expect(changeStatusSchema(invalidStatusData)).to.be.equal('status is invalid')
        done()
      })
    })
  })

})
