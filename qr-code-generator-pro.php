<?php
/**
 * Plugin Name:       QR Code Generator Pro
 * Plugin URI:        https://example.com/qr-code-generator-pro
 * Description:       A professional multi-step custom QR code generator with decorative frames, module styles, logo overlays, gradient colors, and live device preview.
 * Version:           1.0.11
 * Author:            StandardTouch
 * Text Domain:       qr-code-generator-pro
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

define( 'QR_CODE_GEN_PRO_PATH', plugin_dir_path( __FILE__ ) );
define( 'QR_CODE_GEN_PRO_URL', plugin_dir_url( __FILE__ ) );

class QRCodeGeneratorPro {

    public function __construct() {
        add_shortcode( 'custom_qr_generator', array( $this, 'render_shortcode' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
        add_action( 'elementor/frontend/after_enqueue_scripts', array( $this, 'enqueue_assets' ) );
        add_action( 'elementor/editor/after_enqueue_scripts', array( $this, 'enqueue_assets' ) );
        add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
    }

    public static function get_asset_url( $filename ) {
        // 1. Standard: dist/assets/
        if ( file_exists( QR_CODE_GEN_PRO_PATH . 'dist/assets/' . $filename ) ) {
            return QR_CODE_GEN_PRO_URL . 'dist/assets/' . $filename;
        }
        // 2. assets/
        if ( file_exists( QR_CODE_GEN_PRO_PATH . 'assets/' . $filename ) ) {
            return QR_CODE_GEN_PRO_URL . 'assets/' . $filename;
        }
        // 3. Root folder
        if ( file_exists( QR_CODE_GEN_PRO_PATH . $filename ) ) {
            return QR_CODE_GEN_PRO_URL . $filename;
        }
        // 4. Windows backslash fallback on Linux
        if ( file_exists( QR_CODE_GEN_PRO_PATH . 'dist\\assets\\' . $filename ) ) {
            return QR_CODE_GEN_PRO_URL . 'dist%5Cassets%5C' . $filename;
        }
        return QR_CODE_GEN_PRO_URL . 'dist/assets/' . $filename;
    }

    public static function get_server_theme_colors() {
        $colors = array();

        // 1. Elementor Kit Colors (System & Custom Colors)
        $kit_id = get_option( 'elementor_active_kit' );
        if ( $kit_id ) {
            $page_settings = get_post_meta( $kit_id, '_elementor_page_settings', true );
            if ( is_array( $page_settings ) ) {
                if ( ! empty( $page_settings['system_colors'] ) && is_array( $page_settings['system_colors'] ) ) {
                    foreach ( $page_settings['system_colors'] as $sc ) {
                        if ( ! empty( $sc['color'] ) ) {
                            $colors[] = sanitize_text_field( $sc['color'] );
                        }
                    }
                }
                if ( ! empty( $page_settings['custom_colors'] ) && is_array( $page_settings['custom_colors'] ) ) {
                    foreach ( $page_settings['custom_colors'] as $cc ) {
                        if ( ! empty( $cc['color'] ) ) {
                            $colors[] = sanitize_text_field( $cc['color'] );
                        }
                    }
                }
            }
        }

        // 2. Gutenberg Global Styles Palette
        if ( function_exists( 'wp_get_global_settings' ) ) {
            $g_palette = wp_get_global_settings( array( 'color', 'palette', 'theme' ) );
            if ( ! empty( $g_palette ) && is_array( $g_palette ) ) {
                foreach ( $g_palette as $p ) {
                    if ( ! empty( $p['color'] ) ) {
                        $colors[] = sanitize_text_field( $p['color'] );
                    }
                }
            }
        }

        // 3. Astra Theme Palette
        $astra_palette = get_theme_mod( 'astra-color-palettes' );
        if ( is_array( $astra_palette ) && ! empty( $astra_palette['palettes'] ) ) {
            $curr = isset( $astra_palette['currentPalette'] ) ? $astra_palette['currentPalette'] : 'palette_1';
            if ( ! empty( $astra_palette['palettes'][ $curr ] ) && is_array( $astra_palette['palettes'][ $curr ] ) ) {
                foreach ( $astra_palette['palettes'][ $curr ] as $ac ) {
                    if ( ! empty( $ac ) ) {
                        $colors[] = sanitize_text_field( $ac );
                    }
                }
            }
        }

        return array_values( array_unique( array_filter( $colors ) ) );
    }

    public function enqueue_assets() {
        $js_url  = self::get_asset_url( 'main.js' );
        $css_url = self::get_asset_url( 'style.css' );

        wp_enqueue_style(
            'qr-code-gen-pro-css',
            $css_url,
            array(),
            '1.0.11'
        );

        wp_enqueue_script(
            'qr-code-gen-pro-js',
            $js_url,
            array(),
            '1.0.11',
            true
        );

        $server_colors = self::get_server_theme_colors();
        wp_localize_script(
            'qr-code-gen-pro-js',
            'wpGlobalThemeColors',
            $server_colors
        );
    }

    public function render_shortcode( $atts ) {
        $this->enqueue_assets();

        $js_url  = self::get_asset_url( 'main.js' ) . '?ver=1.0.11';
        $css_url = self::get_asset_url( 'style.css' ) . '?ver=1.0.11';
        $colors  = json_encode( self::get_server_theme_colors() );

        $output = '';
        $output .= '<link rel="stylesheet" id="qr-gen-pro-direct-css" href="' . esc_url( $css_url ) . '" type="text/css" media="all" />';
        $output .= '<script>window.wpGlobalThemeColors = ' . ( $colors ? $colors : '[]' ) . ';</script>';
        $output .= '<div id="custom-qr-generator-root" class="qr-gen-wrapper" style="min-height: 500px; width: 100%; display: block;"></div>';
        $output .= '<script src="' . esc_url( $js_url ) . '" id="qr-gen-pro-direct-js"></script>';

        return $output;
    }

    public function add_admin_menu() {
        add_menu_page(
            __( 'QR Code Generator', 'qr-code-generator-pro' ),
            __( 'QR Generator', 'qr-code-generator-pro' ),
            'manage_options',
            'qr-code-generator-pro',
            array( $this, 'render_admin_page' ),
            'dashicons-qr',
            30
        );
    }

    public function render_admin_page() {
        ?>
        <div class="wrap" style="max-width: 1200px; margin-top: 20px;">
            <div style="background: #fff; padding: 20px 30px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                <h1 style="font-size: 24px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0;"><?php esc_html_e( 'QR Code Generator Pro', 'qr-code-generator-pro' ); ?></h1>
                <p style="font-size: 14px; color: #64748b; margin: 0 0 16px 0;"><?php esc_html_e( 'Use the shortcode below to embed the interactive QR Code Builder anywhere on your WordPress site pages, Elementor widgets, or posts:', 'qr-code-generator-pro' ); ?></p>
                <code style="font-size: 16px; padding: 8px 16px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; color: #2563eb; font-weight: 600;">[custom_qr_generator]</code>
            </div>
            
            <h2 style="font-size: 18px; font-weight: 600; color: #334155; margin-bottom: 12px;"><?php esc_html_e( 'Live Preview & Builder', 'qr-code-generator-pro' ); ?></h2>
            <?php echo $this->render_shortcode( array() ); ?>
        </div>
        <?php
    }
}

new QRCodeGeneratorPro();
