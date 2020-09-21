Sub StockAnalysis()
    
    'Declare variables
    Dim Ticker As String
    
    Dim TickerIndex As Integer
    TickerIndex = 2
    
    Dim Volume As Double
    Volume = 0
    
    Dim PercentChange As Double
    
    Dim YearChange As Double
    
    Dim OpenPrice As Double
    OpenPrice = Cells(2, 3).Value
    
    Dim ClosePrice As Double
    ClosePrice = Cells(2, 6).Value
    
    'Declare columns to output our data
    Cells(1, 9).Value = "Ticker"
    Cells(1, 10).Value = "Year Change"
    Cells(1, 11).Value = "Percent Change"
    Cells(1, 12).Value = "Volume"
    
    LasRow = Cells(Rows.Count, 1).End(xlUp).Row
    
    
    For x = 2 To 705714
    
        'Search for different tickers
        If Cells(x + 1, 1).Value <> Cells(x, 1).Value Then
            
            Ticker = Cells(x, 1).Value
            Volume = Volume + Cells(x, 7).Value
            
            'Print the ticker and the volume in the output area
            Range("I" & TickerIndex).Value = Ticker
            
            Range("L" & TickerIndex).Value = Volume
            
            
            'ClosePrice info
            ClosePrice = Cells(x, 6).Value
            
            'Calculate the Yearly Change for each stock
            YearChange = (ClosePrice - OpenPrice)
            
            Range("J" & TickerIndex).Value = YearChange
            
            
            
                If (OpenPrice = 0) Then
                    PercentChange = 0
                    
                Else
                    PercentChange = YearChange / OpenPrice
                    
                End If
                
                'Print the percent change for each ticker
                Range("K" & TickerIndex).Value = PercentChange
                
                Range("K" & TickerIndex).NumberFormat = "0.00%"
                
            
            'Add one to the ticker index
            TickerIndex = TickerIndex + 1
            
            Volume = 0
            
            OpenPrice = Cells(x + 1, 3)
                    
            Else
                Volume = Volume + Cells(x, 7).Value
            
        End If
        
        
        
    Next x
    
    
    'Conditional Formatting
    LastRowYearChange = Cells(Rows.Count, 10).End(xlUp).Row
    
    For x = 2 To LastRowYearChange
    
        If Range("J" & x).Value > 0 Then
            Range("J" & x).Interior.ColorIndex = 4
            
        Else
            Range("J" & x).Interior.ColorIndex = 3
        
        End If
    
    Next x
    
    
    'Challenges
    Range("N2").Value = "Greatest % Increase"
    Range("N3").Value = "Greatest % Decrease"
    Range("N4").Value = "Greatest Total Volume"
    Range("O1").Value = "Ticker"
    Range("P1").Value = "value"
    
    LastRowPercent = Cells(Rows.Count, 11).End(xlUp).Row
    
    For x = 2 To LastRowPercent
    
        If Cells(x, 11).Value = Application.WorksheetFunction.Max(Range("K2:K" & LastRowPercent)) Then
            Range("O2").Value = Cells(x, 9).Value
            Range("P2").Value = Cells(x, 11).Value
            Range("P2").NumberFormat = "0.00%"
            
        ElseIf Cells(x, 11).Value = Application.WorksheetFunction.Min(Range("K2:K" & LastRowPercent)) Then
            Range("O3").Value = Cells(x, 9).Value
            Range("P3").Value = Cells(x, 11).Value
            Range("P3").NumberFormat = "0.00%"
            
        ElseIf Cells(x, 12).Value = Application.WorksheetFunction.Max(Range("L2:L" & LastRowPercent)) Then
            Range("O4").Value = Cells(x, 9).Value
            Range("P4").Value = Cells(x, 12).Value
        
        End If
        
    Next x
            
End Sub
