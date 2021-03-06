/**
 * Ember model for hosts.
 */
import Ember from 'ember';
import DS from 'ember-data';
import ValidationsMixin from '../mixins/validations';
import Regex from '../utils/regex';

export default DS.Model.extend(ValidationsMixin, {

    // Attributes
    farmName: DS.attr('string'),
    shortDescription: DS.attr('string'),
    fullDescription: DS.attr('string'),
    webSite: DS.attr('string'),
    travelDetails: DS.attr('string'),
    noPhone: DS.attr('boolean'),
    noEmail: DS.attr('boolean'),
    isPending: DS.attr('boolean'),
    isSuspended: DS.attr('boolean'),
    activities: DS.attr('array'),

    // Relationships
    user: DS.belongsTo('user'),
    address: DS.belongsTo('address'),
    photos: DS.hasMany('photo'),

    // First photo
    mainPhoto: Ember.computed.readOnly('photos.firstObject'),

    // Translated activities
    displayedActivities: Ember.computed.map('activities', function(activity) {
        return Ember.I18n.t('activities.' + activity);
    }),

    // Phone is mandatory for hosts, this binding is used for validation
    phoneBinding: 'user.phone',

    // Validations
    validations: {
        farmName: {
            presence: true,
            length: { minimum: 5, maximum: 50 }
        },
        shortDescription: {
            presence: true,
            length: { minimum: 5, maximum: 255 }
        },
        fullDescription: {
            presence: true,
            length: { minimum: 5, maximum: 3000 }
        },
        webSite: {
            format: {
                with: Regex.URL,
                allowBlank: true
            }
        },
        phone: {
            presence: true
        }
    }
});
