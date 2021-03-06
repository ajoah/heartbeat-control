jQuery( document ).ready( function() {

    function show_processing( element ) {
        var icon = '<i class="hbc-settings-processing fa fa-spinner" style="vertical-align: middle;"></i>';
        jQuery( element ).after( icon );
    }

    function processing_to_complete( element ) {
        jQuery( element ).siblings('.hbc-settings-processing').addClass( 'fa-check-circle' );
        jQuery( element ).siblings('.hbc-settings-processing').removeClass( 'fa-spinner' );
        jQuery( element ).siblings('.hbc-settings-processing').fadeOut( 5000, function() {
            jQuery( this ).remove();
        });
    }

    jQuery( '.hbc_overrides' ).change( function() {

        var self = this;

        show_processing( this );

        var override_name = jQuery( this ).attr( 'name' );
        var subheader = jQuery( this ).data( 'subheader' );

        var data = {
            'action': 'hbc_update_override',
            'hbc_settings_nonce': hbc_settings_nonce,
            'hbc_data': {
                'override_name': override_name,
                'override_subheader': subheader,
                'override_value': this.value
            }
        };

        jQuery.post( ajaxurl, data, function( response ) {
            if ( response == 'success' ) {
                processing_to_complete( self );
            }
        })

    });

    jQuery( '.hbc_frontend_allowed' ).change( function() {

        var self = this;

        show_processing( this );

        var data = {
            'action': 'hbc_update_allowed',
            'hbc_settings_nonce': hbc_settings_nonce,
            'hbc_data': {
                'location': 'frontend',
                'allowed': this.value
            }
        };

        jQuery.post( ajaxurl, data, function( response ) {

            // @todo Consolidate this block
            if ( response == 'success' ) {
                processing_to_complete( self );
            }

            if ( response == 'success' && self.value !== 'denied' ) {
                jQuery('#hbc_frontend_interval_container').show();
                jQuery('#hbc_frontend_interval_entry').hide();
                jQuery('#hbc_disable_frontend_interval').hide();
                jQuery('#hbc_frontend_interval_settings').show();
                jQuery('#hbc_enable_frontend_interval').show();
                jQuery('#hbc_enable_frontend_interval_button').show();

            } else if( response == 'success' && self.value == 'denied' ) {
                jQuery('#hbc_frontend_interval_container').hide();
            }
        });

    });

    jQuery( '.hbc_admin_allowed' ).change( function() {

        var self = this;

        show_processing( this );

        var data = {
            'action': 'hbc_update_allowed',
            'hbc_settings_nonce': hbc_settings_nonce,
            'hbc_data': {
                'location': 'admin',
                'allowed': this.value
            }
        };

        jQuery.post( ajaxurl, data, function( response ) {

            // @todo Consolidate this block
            if ( response == 'success' ) {
                processing_to_complete( self );
            }

            if ( response == 'success' && self.value !== 'denied' ) {
                jQuery('#hbc_admin_interval_entry').hide();
                jQuery('#hbc_disable_admin_interval').hide();
                jQuery('#hbc_admin_interval_container').show();
                jQuery('#hbc_admin_interval_settings').show();
                jQuery('#hbc_enable_admin_interval').show();
                jQuery('#hbc_enable_admin_interval_button').show();

            } else if( response == 'success' && self.value == 'denied' ) {
                jQuery('#hbc_admin_interval_container').hide();
            }
        });

    });

    jQuery( '#hbc_enable_admin_interval_button' ).click( function() {
        jQuery('#hbc_enable_admin_interval').hide();
        jQuery('#hbc_admin_interval_settings').show();
        jQuery('#hbc_admin_interval_entry').show();
        jQuery('#hbc_disable_admin_interval').show();
    });

    jQuery( '#hbc_enable_frontend_interval_button' ).click( function() {
        jQuery('#hbc_enable_frontend_interval').hide();
        jQuery('#hbc_frontend_interval_settings').show();
        jQuery('#hbc_frontend_interval_entry').show();
        jQuery('#hbc_disable_frontend_interval').show();
    });

    jQuery( '#hbc_disable_admin_interval' ).click( function() {

        var self = this;

        show_processing( this );

        var data = {
            'action': 'hbc_disable_interval',
            'hbc_settings_nonce': hbc_settings_nonce,
            'hbc_data': {
                'location': 'admin'
            }
        };

        jQuery.post( ajaxurl, data, function( response ) {

            if ( response == 'success' ) {
                jQuery('#hbc_admin_interval_settings').hide();
                jQuery('#hbc_enable_admin_interval').show();
                jQuery('#hbc_admin_interval_entry').val('');
                processing_to_complete( self );
            }

        });


    });

    jQuery( '#hbc_disable_frontend_interval' ).click( function() {

        var self = this;

        show_processing( this );

        var data = {
            'action': 'hbc_disable_interval',
            'hbc_settings_nonce': hbc_settings_nonce,
            'hbc_data': {
                'location': 'admin'
            }

        };

        jQuery.post( ajaxurl, data, function( response ) {

            if ( response == 'success' ) {
                jQuery('#hbc_frontend_interval_settings').hide();
                jQuery('#hbc_enable_frontend_interval').show();
                jQuery('#hbc_frontend_interval_entry').val('');
                processing_to_complete( self );
            }

        });


    });

    jQuery( '#hbc_save_admin_interval' ).click( function() {

        var self = this;

        show_processing( this );

        var interval = jQuery('#hbc_admin_interval_entry').val();

        var data = {
            'action': 'hbc_update_interval',
            'hbc_settings_nonce': hbc_settings_nonce,
            'hbc_data': {
                'location': 'admin',
                'interval': interval
            }
        };

        jQuery.post( ajaxurl, data, function( response ) {

            if ( response == 'success' ) {
                jQuery( '#hbc_save_admin_interval' ).hide();
                jQuery('#hbc_admin_interval_settings').show();
                jQuery('#hbc_enable_admin_interval').hide();
                processing_to_complete( self );
            }

        });

    });

    jQuery( '#hbc_save_frontend_interval' ).click( function() {

        var self = this;

        show_processing( this );

        var interval = jQuery('#hbc_frontend_interval_entry').val();

        var data = {
            'action': 'hbc_update_interval',
            'hbc_settings_nonce': hbc_settings_nonce,
            'hbc_data': {
                'location': 'frontend',
                'interval': interval
            }
        };

        jQuery.post( ajaxurl, data, function( response ) {

            if ( response == 'success' ) {
                jQuery( '#hbc_save_frontend_interval' ).hide();
                jQuery('#hbc_frontend_interval_settings').show();
                jQuery('#hbc_enable_frontend_interval').hide();
                processing_to_complete( self );
            }

        });


    });

    jQuery( '#hbc_admin_interval_entry' ).on( 'change keyup paste', function() {

        if ( parseInt( this.value ) >= 15 && parseInt( this.value ) <= 300 ) {
            jQuery( '#hbc_save_admin_interval' ).show();
        } else {
            jQuery( '#hbc_save_admin_interval' ).hide();
        }

    });

    jQuery( '#hbc_frontend_interval_entry' ).on( 'change keyup paste', function() {

        if ( parseInt( this.value ) >= 15 && parseInt( this.value ) <= 300 ) {
            jQuery( '#hbc_save_frontend_interval' ).show();
        } else {
            jQuery( '#hbc_save_frontend_interval' ).hide();
        }

    });

});