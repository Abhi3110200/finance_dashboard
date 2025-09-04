"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { jsPDF } from "jspdf"
interface DownloadReportButtonProps {
    targetId: string
    fileName?: string
}


export function DownloadReportButton({ targetId, fileName = "report.pdf" }: DownloadReportButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    // More aggressive color cleanup function
    const cleanupModernColors = (element: HTMLElement) => {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_ELEMENT,
            null
        )

        const colorProperties = [
            'color',
            'backgroundColor',
            'borderColor',
            'borderTopColor',
            'borderRightColor',
            'borderBottomColor',
            'borderLeftColor',
            'outlineColor',
            'textDecorationColor',
            'columnRuleColor',
            'fill',
            'stroke'
        ]

        let node: Node | null
        while ((node = walker.nextNode())) {
            const el = node as HTMLElement

            // Remove any inline styles that contain modern color functions
            if (el.style.cssText) {
                let styleText = el.style.cssText

                // Remove any CSS that contains modern color functions
                styleText = styleText.replace(/[^;]*(?:oklch|oklab|lch|lab)\([^)]+\)[^;]*/gi, '')

                // Clean up any remaining semicolons
                styleText = styleText.replace(/;;+/g, ';').replace(/^;|;$/g, '')

                el.style.cssText = styleText
            }

            // Force safe colors for all color properties
            colorProperties.forEach(prop => {
                const computedValue = window.getComputedStyle(el).getPropertyValue(prop)
                if (computedValue && /(?:oklch|oklab|lch|lab)\s*\(/i.test(computedValue)) {
                    // Set safe fallback colors
                    switch (prop) {
                        case 'color':
                            el.style.color = '#1a1a1a'
                            break
                        case 'backgroundColor':
                            el.style.backgroundColor = '#ffffff'
                            break
                        case 'fill':
                            (el.style as unknown as { fill: string }).fill = '#1a1a1a'
                            break
                        case 'stroke':
                            (el.style as unknown as { stroke: string }).stroke = '#e5e7eb'
                            break
                        default:
                            if (prop.includes('border') || prop.includes('outline')) {
                                (el.style as unknown as Record<string, string>)[prop] = '#e5e7eb'
                            }
                    }
                }
            })

            // Remove any CSS custom properties that might contain modern colors
            if (el.style) {
                for (let i = el.style.length - 1; i >= 0; i--) {
                    const property = el.style[i]
                    if (property.startsWith('--')) {
                        const value = el.style.getPropertyValue(property)
                        if (/(?:oklch|oklab|lch|lab)\s*\(/i.test(value)) {
                            el.style.removeProperty(property)
                        }
                    }
                }
            }
        }
    }

    const handleDownload = async () => {
        if (isGenerating) return

        console.log("Starting PDF generation...")
        const element = document.getElementById(targetId)

        if (!element) {
            console.error("Target element not found")
            toast.error("Could not find the report content to download")
            return
        }

        setIsGenerating(true)

        try {
            // Dynamic import to avoid SSR issues
            const html2canvas = (await import('html2canvas')).default
            const jsPDF = (await import('jspdf')).jsPDF

            toast.loading("Generating PDF...", {
                id: "pdf-generation",
                duration: 10000,
                position: "top-center",
            })

            // Create a completely isolated clone
            const elementClone = element.cloneNode(true) as HTMLElement

            // Create a temporary container to isolate the clone
            const tempContainer = document.createElement('div')
            tempContainer.style.position = 'fixed'
            tempContainer.style.left = '-99999px'
            tempContainer.style.top = '0'
            tempContainer.style.width = '210mm'
            tempContainer.style.height = 'auto'
            tempContainer.style.backgroundColor = '#ffffff'
            tempContainer.style.fontFamily = 'Arial, sans-serif'
            tempContainer.style.fontSize = '14px'
            tempContainer.style.lineHeight = '1.4'
            tempContainer.style.color = '#1a1a1a'

            tempContainer.appendChild(elementClone)
            document.body.appendChild(tempContainer)

            // Style the clone
            Object.assign(elementClone.style, {
                width: '100%',
                padding: '20px',
                backgroundColor: '#ffffff',
                boxShadow: 'none',
                border: 'none',
                color: '#1a1a1a'
            })

            // Aggressively clean up modern colors
            cleanupModernColors(tempContainer)

            // Wait for any images to load
            const images = tempContainer.getElementsByTagName("img")
            if (images.length > 0) {
                await Promise.all(
                    Array.from(images).map((img) => {
                        if (img.complete) return Promise.resolve()
                        return new Promise((resolve) => {
                            const timeout = setTimeout(resolve, 2000)
                            img.onload = () => {
                                clearTimeout(timeout)
                                resolve(void 0)
                            }
                            img.onerror = () => {
                                clearTimeout(timeout)
                                resolve(void 0)
                            }
                        })
                    })
                )
            }

            // Generate canvas with minimal options to avoid parsing issues
            // @ts-ignore - scale is a valid html2canvas option but not in the type definitions
            const canvas = await html2canvas(tempContainer, {
                scale: 1.5,
                useCORS: true,
                allowTaint: true,
                logging: false,
                backgroundColor: "#ffffff",
                removeContainer: false,
                imageTimeout: 10000,
                ignoreElements: (element: HTMLElement) => {
                    // Skip elements that might cause parsing issues
                    const tagName = element.tagName.toLowerCase()
                    return tagName === 'script' || tagName === 'style' || element.hasAttribute('data-ignore-pdf')
                },
                onclone: (clonedDoc: Document) => {
                    // Add comprehensive CSS override
                    const style = document.createElement("style")
                    style.textContent = `
              /* Reset all modern color functions */
              * {
                font-family: Arial, sans-serif !important;
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              /* Override root variables */
              :root {
                --background: #ffffff !important;
                --foreground: #1a1a1a !important;
                --muted: #f5f5f5 !important;
                --muted-foreground: #6b7280 !important;
                --border: #e5e7eb !important;
                --card: #ffffff !important;
                --card-foreground: #1a1a1a !important;
                --primary: #1a1a1a !important;
                --primary-foreground: #ffffff !important;
                --secondary: #f5f5f5 !important;
                --secondary-foreground: #1a1a1a !important;
                --accent: #f5f5f5 !important;
                --accent-foreground: #1a1a1a !important;
                --destructive: #ef4444 !important;
                --destructive-foreground: #ffffff !important;
                --ring: #1a1a1a !important;
              }
              
              /* Force safe colors for all elements */
              body, body * {
                color: #1a1a1a !important;
                background-color: transparent !important;
              }
              
              /* Common utility classes */
              .bg-card, .bg-background, .bg-gray-50, .bg-white { 
                background-color: #ffffff !important; 
              }
              .bg-muted, .bg-gray-100 { 
                background-color: #f5f5f5 !important; 
              }
              .text-foreground, .text-gray-900 { 
                color: #1a1a1a !important; 
              }
              .text-muted-foreground, .text-gray-600 { 
                color: #6b7280 !important; 
              }
              .border, .border-gray-200 { 
                border-color: #e5e7eb !important; 
              }
              .text-red-600 { 
                color: #dc2626 !important; 
              }
              .border-red-600 { 
                border-color: #dc2626 !important; 
              }
              .bg-red-50 { 
                background-color: #fef2f2 !important; 
              }
              .text-green-600 { 
                color: #16a34a !important; 
              }
              .bg-green-50 { 
                background-color: #f0fdf4 !important; 
              }
              
              /* Remove any problematic styles */
              [style*="oklch"], 
              [style*="oklab"], 
              [style*="lch"], 
              [style*="lab"] {
                color: #1a1a1a !important;
                background-color: #ffffff !important;
                border-color: #e5e7eb !important;
              }
            `
                    clonedDoc.head.appendChild(style)
                },
            } as any)

            // Clean up the temporary container
            document.body.removeChild(tempContainer)

            // Create PDF with proper dimensions
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            })

            const pageWidth = pdf.internal.pageSize.getWidth()
            const pageHeight = pdf.internal.pageSize.getHeight()
            const margin = 10

            // Calculate dimensions to fit content on page
            const availableWidth = pageWidth - (margin * 2)
            const availableHeight = pageHeight - (margin * 2)

            const ratio = Math.min(availableWidth / (canvas.width / 1.5), availableHeight / (canvas.height / 1.5))
            const imgWidth = (canvas.width / 1.5) * ratio
            const imgHeight = (canvas.height / 1.5) * ratio

            // Center the content
            const x = (pageWidth - imgWidth) / 2
            const y = margin

            // Add the canvas as image to PDF
            pdf.addImage(
                canvas.toDataURL("image/jpeg", 0.85),
                "JPEG",
                x,
                y,
                imgWidth,
                imgHeight
            )

            // Add footer with generation date
            const date = new Date().toLocaleDateString()
            pdf.setFontSize(8)
            pdf.setTextColor(100)
            pdf.text(`Generated on ${date}`, margin, pageHeight - 5)
            pdf.text("Financial Report", pageWidth - margin, pageHeight - 5, { align: "right" })

            // Save the PDF
            pdf.save(fileName)

            toast.success("PDF downloaded successfully!", {
                id: "pdf-generation",
                duration: 3000,
                position: "top-center",
            })

        } catch (error) {
            console.error("Error generating PDF:", error)
            toast.error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`, {
                id: "pdf-generation",
                duration: 5000,
                position: "top-center",
            })
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Button
            ref={buttonRef}
            onClick={handleDownload}
            disabled={isGenerating}
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? "Generating..." : "Download PDF"}
        </Button>
    )
}