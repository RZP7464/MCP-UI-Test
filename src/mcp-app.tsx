/**
 * @file E-commerce Product Catalog - Tira Beauty Store Demo
 */
import {
  App,
  applyDocumentTheme,
  applyHostFonts,
  applyHostStyleVariables,
  type McpUiHostContext,
} from "@modelcontextprotocol/ext-apps";
import { useEffect, useState } from "preact/hooks";
import { render } from "preact";

// Hardcoded products from Tira catalog
const PRODUCTS = [
  {
    id: 1,
    title: "Essence Long Lasting Lipstick - 02 Just Perfect",
    vendor: "Essence",
    price: 340,
    comparePrice: 398,
    image: "https://mcp-ui-test-production.up.railway.app/public/images/product-1-essence-lipstick.jpg",
    description: "Premium quality lipstick product for everyday use. Perfect for all skin types.",
    category: "Lipstick"
  },
  {
    id: 2,
    title: "Lakme 9 To 5 Matte To Glass Liquid Lip Color - Passion Pink",
    vendor: "Lakme",
    price: 650,
    comparePrice: 748,
    image: "https://mcp-ui-test-production.up.railway.app/public/images/product-2-lakme-lipcolor.jpg",
    description: "Matte to glass finish liquid lip color. Long-lasting formula for all-day wear.",
    category: "Lipstick"
  },
  {
    id: 3,
    title: "Typsy Beauty Drink & Blink Curling Mascara - Black",
    vendor: "Typsy Beauty",
    price: 899,
    comparePrice: 1090,
    image: "https://mcp-ui-test-production.up.railway.app/public/images/product-3-typsy-mascara.jpg",
    description: "Professional curling mascara for dramatic lashes. Smudge-proof formula.",
    category: "Mascara"
  },
  {
    id: 4,
    title: "Minimalist SPF 60 PA++++ Sunscreen With Antioxidant Silymarin",
    vendor: "Minimalist",
    price: 500,
    comparePrice: 622,
    image: "https://mcp-ui-test-production.up.railway.app/public/images/product-4-minimalist-sunscreen.jpg",
    description: "High protection sunscreen with antioxidants. Perfect for daily sun protection.",
    category: "Sunscreen"
  },
  {
    id: 5,
    title: "Essence The Brown Edition Eyeshadow Palette - 30",
    vendor: "Essence",
    price: 580,
    comparePrice: 711,
    image: "https://mcp-ui-test-production.up.railway.app/public/images/product-5-essence-eyeshadow.jpg",
    description: "30 stunning brown shades eyeshadow palette. Create endless eye looks.",
    category: "Eye Shadow"
  }
];

function ProductStore() {
  const [app, setApp] = useState<App | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [hostContext, setHostContext] = useState<McpUiHostContext | undefined>();

  useEffect(() => {
    if (hostContext?.theme) {
      applyDocumentTheme(hostContext.theme);
    }
    if (hostContext?.styles?.variables) {
      applyHostStyleVariables(hostContext.styles.variables);
    }
    if (hostContext?.styles?.css?.fonts) {
      applyHostFonts(hostContext.styles.css.fonts);
    }
  }, [hostContext]);

  useEffect(() => {
    const instance = new App({ name: "Tira Beauty Store", version: "1.0.0" });
    instance.onerror = console.error;
    instance.onhostcontextchanged = (params) => {
      setHostContext((prev) => ({ ...prev, ...params }));
    };

    instance
      .connect()
      .then(() => {
        setApp(instance);
        setHostContext(instance.getHostContext());
      })
      .catch(setError);
  }, []);

  if (error) return <div style={{ padding: "20px", color: "red" }}><strong>ERROR:</strong> {error.message}</div>;
  if (!app) return <div style={{ padding: "20px" }}>Loading store...</div>;

  return <ProductCatalog hostContext={hostContext} />;
}

interface ProductCatalogProps {
  hostContext?: McpUiHostContext;
}

function ProductCatalog({ hostContext }: ProductCatalogProps) {
  const calculateDiscount = (price: number, comparePrice: number) => {
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        paddingTop: hostContext?.safeAreaInsets?.top,
        paddingRight: hostContext?.safeAreaInsets?.right,
        paddingBottom: hostContext?.safeAreaInsets?.bottom,
        paddingLeft: hostContext?.safeAreaInsets?.left,
      }}
    >
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "30px 20px",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>Tira Beauty Store</h1>
        <p style={{ margin: "10px 0 0 0", opacity: 0.9, fontSize: "16px" }}>Premium Beauty Products Collection</p>
      </header>

      {/* Products Grid */}
      <main style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px"
        }}>
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              style={{
                background: "white",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
              }}
            >
              {/* Product Image */}
              <div style={{
                position: "relative",
                paddingTop: "100%",
                overflow: "hidden",
                background: "#f8f9fa"
              }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                {/* Discount Badge */}
                <div style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "#ef4444",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)"
                }}>
                  {calculateDiscount(product.price, product.comparePrice)}% OFF
                </div>
                {/* Category Badge */}
                <div style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  background: "rgba(255, 255, 255, 0.95)",
                  color: "#667eea",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600"
                }}>
                  {product.category}
                </div>
              </div>

              {/* Product Details */}
              <div style={{ padding: "20px" }}>
                {/* Vendor */}
                <div style={{
                  color: "#667eea",
                  fontSize: "12px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "8px"
                }}>
                  {product.vendor}
                </div>

                {/* Title */}
                <h3 style={{
                  margin: "0 0 12px 0",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1e293b",
                  lineHeight: "1.4",
                  height: "44px",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical"
                }}>
                  {product.title}
                </h3>

                {/* Description */}
                <p style={{
                  margin: "0 0 16px 0",
                  fontSize: "14px",
                  color: "#64748b",
                  lineHeight: "1.5",
                  height: "42px",
                  overflow: "hidden"
                }}>
                  {product.description}
                </p>

                {/* Price Section */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px"
                }}>
                  <span style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#1e293b"
                  }}>
                    ₹{product.price}
                  </span>
                  <span style={{
                    fontSize: "16px",
                    color: "#94a3b8",
                    textDecoration: "line-through"
                  }}>
                    ₹{product.comparePrice}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onClick={() => console.log(`Added ${product.title} to cart`)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "30px 20px",
        color: "#64748b",
        fontSize: "14px"
      }}>
        <p style={{ margin: 0 }}>Tira Beauty Store Demo - Powered by Claude MCP</p>
      </footer>
    </div>
  );
}

render(<ProductStore />, document.getElementById("root")!);
